import { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { toggleNavbarView, setActivePage } from "../Redux/MenuSlice";
import { Unplug } from "lucide-react";

const NotFound = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActivePage(null));
  }, [dispatch]);

  const handleBackToDashboard = () => {
    dispatch(setActivePage("Dashboard"));
    dispatch(toggleNavbarView());
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Unplug size={100} />
      <h1 className="sm:text-2xl text-md font-bold">404 - Page Not Found</h1>
      <Link to="/" onClick={handleBackToDashboard}>
        <button className="cursor-pointer bg-teal-300 rounded-full px-4 py-2 mt-4 hover:bg-teal-200 transition-colors duration-300 font-semibold text-teal-1000 ">
          Back to Dashboard
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
