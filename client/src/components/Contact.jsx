/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Contact({ listing }) {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchlandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);

        if (!res.ok) {
          console.log("error");
        }

        const data = await res.json();
        setLandLord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchlandlord();
  }, [listing.userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landLord && (
        <div>
          <p>
            Contact <span className="font-semibold">{landLord.username}</span>{" "}
            for{" "}
            <span className="font-semibold">{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name="message"
            id="message"
            value={message}
            onChange={onChange}
            placeholder="Enter your message here... "
            rows="2"
            className="rounded-lg w-full border p-3"
          ></textarea>

          <Link
            to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          >
            send message
          </Link>
        </div>
      )}
    </>
  );
}
