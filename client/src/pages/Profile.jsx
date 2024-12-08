import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { supabase } from "../../supabase.js";
import {
  upDateUserStart,
  upDateUserSuccess,
  upDateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFailure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import { errorHandeler } from "../../../api/utils/error.js";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({});
  const [fileUploadError, setFileUploadError] = useState(false);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const [upDateSuccess, setUpDateSuccess] = useState(false);
  const [showListingError, setShowListingError] = useState(false);
  const [userListing, setUserListing] = useState(null);
  console.log(userListing);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    const { data, error } = await supabase.storage
      .from("profileImage")
      .upload(`${Date.now()}_image.png`, file);

    if (error) {
      setFileUploadError(true);
      console.error("Error uploading image:", error);
      return null;
    }

    const url = await supabase.storage
      .from("profileImage")
      .getPublicUrl(data.path);
    setFormData({ ...formData, avatar: url.data.publicUrl });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(upDateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok === false) {
        dispatch(upDateUserFailure(data));
        return;
      }
      dispatch(upDateUserSuccess(data));
      setUpDateSuccess(true);
    } catch (error) {
      dispatch(upDateUserFailure(error.message));
    }
  };

  const deleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok === false) {
        dispatch(upDateUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const signOutUser = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("/api/auth/signout", {
        method: "GET",
      });
      const data = await res.json();
      if (res.ok === false) {
        dispatch(signoutUserFailure(data));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      errorHandeler(error.message);
    }
  };

  const handleShowList = async () => {
    setShowListingError(false);
    try {
      const res = await fetch(`/api/user/listing/${currentUser._id}`);

      const data = await res.json();

      if (res.ok == false) {
        setShowListingError(true);
        return;
      }

      setUserListing(data);
    } catch (error) {
      setShowListingError(error);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          accept="image/*"
          hidden
          ref={fileRef}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar ? formData.avatar : currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />

        <p className="text-sm self-center">
          {
            fileUploadError ? (
              <span className="text-red-700">
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : (
              ""
            )
            // ) : filePerc > 0 && filePerc < 100 ? (
            //   <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
            // ) : filePerc === 100 ? (
            //   <span className='text-green-700'>Image successfully uploaded!</span>
            // ) :
          }
        </p>

        <input
          type="text"
          onChange={handleChange}
          defaultValue={currentUser.username}
          placeholder="username"
          id="username"
          className="border p-3 rounded-lg"
        />

        <input
          type="email"
          onChange={handleChange}
          defaultValue={currentUser.email}
          placeholder="email"
          id="email"
          className="border p-3 rounded-lg"
        />

        <input
          type="password"
          onChange={handleChange}
          placeholder="password"
          id="password"
          className="border p-3 rounded-lg"
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white
        p-3 uppercase text-center hover:opacity-95 rounded-lg"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={deleteUser} className="text-red-700 cursor-pointer">
          Delete account
        </span>
        <span onClick={signOutUser} className="text-red-700 cursor-pointer">
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {upDateSuccess ? "Uesr Is Update Successfully!" : ""}
      </p>

      <button onClick={handleShowList} className="text-green-700 w-full">
        Show List
      </button>
      <p className="text-red-700 mt-5">
        {showListingError ? "Error showing listings" : ""}
      </p>

      {userListing && userListing.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListing.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0].data.publicUrl}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button className="text-red-700 uppercase">Delete</button>
                <button className="text-green-700 uppercase">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
