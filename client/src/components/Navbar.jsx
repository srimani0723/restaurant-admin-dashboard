import {
  CircleUserRound,
  ChevronsRight,
  ChevronsLeft,
  LayoutDashboard,
  CookingPot,
  Package,
  Search,
  ShoppingBasket,
  Soup,
  PackageOpen,
  HandPlatter,
  BookSearch,
  BaggageClaim,
  LayoutPanelLeft,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleNavbarView, setActivePage } from "../Redux/menuSlice";

const list = [
  {
    name: "Dashboard",
    path: "/",
    icon: <LayoutDashboard size={25} />,
    activeIcon: <LayoutPanelLeft size={25} />,
  },
  {
    name: "Menu",
    path: "/menu",
    icon: <CookingPot size={25} />,
    activeIcon: <HandPlatter size={25} />,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: <Package size={25} />,
    activeIcon: <PackageOpen size={25} />,
  },
  {
    name: "Search",
    path: "/search",
    icon: <Search size={25} />,
    activeIcon: <BookSearch size={25} />,
  },
  {
    name: "Cart",
    path: "/cart",
    icon: <ShoppingBasket size={25} />,
    activeIcon: <BaggageClaim size={25} />,
  },
];

const Navbar = () => {
  const { toggleView, activePage } = useSelector((state) => state.menu);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleNavbarView());
  };

  const handleSetActivePage = (page) => {
    dispatch(setActivePage(page));
  };

  return (
    <aside
      className={` ${toggleView ? "lg:w-2/12 sm:w-6/12 w-11/12" : "lg:w-15 w-15"} md:sticky fixed  sm:h-screen h-full lg:block top-0 z-50  transition-all duration-100 ease-in`}
    >
      <nav className="h-full flex flex-col justify-between bg-white border-r border-gray-500 shadow-sm/30 p-2 ">
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            {toggleView && (
              <h1 className="text-xl font-bold flex-1 flex items-center gap-2">
                <Soup size={30} fill="orange" color="maroon" />
                Restaurant
              </h1>
            )}
            <span onClick={handleToggle} className="cursor-pointer">
              {!toggleView ? (
                <ChevronsRight size={30} />
              ) : (
                <ChevronsLeft size={30} />
              )}
            </span>
          </div>

          <div className="mt-4">
            <ul className="grid gap-3 p-0 m-0">
              {list.map((item) => (
                <NavLink to={item.path} key={item.name}>
                  <li
                    onClick={() => handleSetActivePage(item.name)}
                    className={`p-2 ${activePage === item.name ? "bg-teal-200 text-teal-1000" : "hover:bg-teal-100"}   cursor-pointer rounded-full font-medium flex items-center transition-all duration-500 ease-in-out`}
                  >
                    {activePage === item.name
                      ? (item.activeIcon ?? item.icon)
                      : item.icon}
                    {toggleView && (
                      <p className="ml-2 lg:block transition-all duration-500 ease-in-out">
                        {item.name}
                      </p>
                    )}
                  </li>
                </NavLink>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center  rounded-full p-2 bg-teal-200">
          <CircleUserRound size={30} color="#008080" />
          <div>
            {toggleView && (
              <h2 className="font-semibold ml-1 text-teal-900 text-lg">
                Admin
              </h2>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Navbar;
