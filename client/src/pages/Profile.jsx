import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

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
import Parse from "../../back4app";
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

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    try {
      let name = `${Date.now() + file.name}`;
      const File = new Parse.File(name, file);
      await File.save();

      const fileUrl = File.url();

      const Listing = Parse.Object.extend("ImageProfil");
      const listing = new Listing();
      listing.set("photo", File);
      await listing.save();
      setFormData({ ...formData, avatar: fileUrl });
    } catch (error) {
      if (error) {
        setFileUploadError(true);
        console.error("Error uploading image:", error);
        return null;
      }
    }
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

  const deleteList = async (listId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok == false) {
        console.log(data.message);
        return;
      }
      setUserListing((prev) =>
        prev.filter((listing) => listing._id !== listId)
      );
    } catch (error) {
      console.log(error.message);
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
          {fileUploadError ? (
            <span className="text-red-700">
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : (
            ""
          )}
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
                  src={listing.imageUrls[0]}
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
                <button
                  onClick={() => deleteList(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700 uppercase">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
