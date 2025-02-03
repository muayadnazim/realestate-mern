import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { useState, useEffect } from "react";
import { Navigation } from "swiper/modules";
import { useParams } from "react-router-dom";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";
import { useSelector } from "react-redux";
export default function Listing() {
  const { currentUser } = useSelector((state) => state.user);

  SwiperCore.use([Navigation]);
  const params = useParams();
  const [contact, setContat] = useState(false);
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const getList = async () => {
      try {
        setError(false);
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.id}`);
        const data = await res.json();
        if (res.ok == false) {
          setError(true);
          return;
        }

        setList(data);
        setError(false);
        setLoading(false);
      } catch (error) {
        console.log(error);

        setError(true);
        setLoading(false);
      }
    };
    getList();
  }, [params.id]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {list && !loading && !error && (
        <div>
          <Swiper navigation>
            {list.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className="text-slate-500"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}

          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold">
              {list.name} - ${" "}
              {list.offer
                ? `${list.discountPrice.toLocaleString("en-US")} Discount`
                : list.regularPrice.toLocaleString("en-US")}
              {list.type === "rent" && " / month"}
            </p>
            <p className="flex items-center mt-6 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {list.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {list.type === "rent" ? "For Rent" : "For Sell"}
              </p>
              {list.offer && (
                <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  ${+list.regularPrice - +list.discountPrice}
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">Description - </span>
              {list.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {list.bedrooms > 1
                  ? `${list.bedrooms} beds `
                  : `${list.bedrooms} bed `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {list.bathrooms > 1
                  ? `${list.bathrooms} baths `
                  : `${list.bathrooms} bath `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {list.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {list.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

            {currentUser && currentUser._id !== list.userRef && !contact && (
              <button
                className="bg-slate-600 rounded-lg uppercase text-white p-3 hover:opacity-95"
                onClick={() => setContat(true)}
              >
                Send Message{" "}
              </button>
            )}
            {contact && <Contact listing={list} />}
          </div>
        </div>
      )}
    </main>
  );
}
