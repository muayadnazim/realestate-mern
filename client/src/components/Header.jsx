import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-600">Real</span>
            <span className="text-slate-800 ">Estate</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="focus:outline-none bg-transparent w-24 sm:w-64"
          />
          <IoSearch className="text-slate-500" />
        </form>

        <div className="flex text-slate-500 justify-between gap-x-2.5">
          <Link className="hidden sm:inline  " to="/">
            Home
          </Link>
          <Link className="hidden sm:inline" to="/about">
            About
          </Link>

          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full w-7 h-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="list-none text-slate-700 hover:underline">
                {" "}
                Sign in
              </li>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
