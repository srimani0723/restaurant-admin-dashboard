import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";
import MenuCard from "../components/MenuCard";
import useDebounce from "../hooks/useDebounce";
import MenuForm from "../components/MenuForm";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedCategory,
  setIsAvailable,
  setMaxPrice,
  setMinPrice,
} from "../Redux/menuSlice";
import { toggleMenuFormView } from "../Redux/menuFormSlice";
import EmptyView from "../components/EmptyView";

const MenuManagement = () => {
  const dispatch = useDispatch();
  const handleAddMenu = () => {
    dispatch(toggleMenuFormView());
  };
  const { selectedCategory, isAvailable, minPrice, maxPrice } = useSelector(
    (state) => state.menu,
  );
  const { viewMenuForm } = useSelector((state) => state.menuForm);
  const minPriceDebounced = useDebounce(minPrice, 500);
  const maxPriceDebounced = useDebounce(maxPrice, 500);

  const { query } = useFetch({
    url: `/api/menu?category=${selectedCategory}&isAvailable=${isAvailable}&minPrice=${minPriceDebounced}&maxPrice=${maxPriceDebounced}`,
  });
  const { data, isLoading, error } = query;

  const totalMenuPart = () => (
    <div className="flex w-full justify-between mt-2">
      <div className="flex items-center bg-teal-200 py-2 px-4 rounded-xl font-bold text-teal-600">
        Total Menu:
        <span className="text-center text-2xl">{data?.length || 0}</span>
      </div>
      <button
        onClick={handleAddMenu}
        className="bg-teal-600 text-white px-4 py-2 rounded-full font-bold hover:bg-teal-700 transition-colors cursor-pointer "
      >
        Add Menu
      </button>
    </div>
  );

  const filterPart = () => {
    const categories = [
      "All",
      "Appetizer",
      "Main Course",
      "Dessert",
      "Beverage",
    ];
    return (
      <div className="w-full mt-3 flex md:flex-row flex-col flex-wrap gap-4">
        <select
          onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
          value={selectedCategory}
          className="bg-orange-100 outline-none py-2 px-4 cursor-pointer text-lg font-semibold rounded-full border-2 border-orange-600 flex-1"
        >
          {categories.map((category) => (
            <option
              className="bg-orange-100 cursor-pointer rounded-2xl"
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => dispatch(setIsAvailable(e.target.value))}
          value={isAvailable}
          className="bg-orange-100 outline-none py-2 px-4 cursor-pointer text-lg font-semibold rounded-full border-2 border-orange-600 flex-1"
        >
          <option
            className="bg-orange-100 cursor-pointer rounded-2xl"
            value="true"
          >
            Available
          </option>
          <option
            className="bg-orange-100 cursor-pointer rounded-2xl"
            value="false"
          >
            Not Available
          </option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => dispatch(setMinPrice(e.target.value))}
          className="bg-orange-100 outline-none py-2 px-4 cursor-pointer text-lg font-semibold rounded-full border-2 border-orange-600 flex-1"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => dispatch(setMaxPrice(e.target.value))}
          className="bg-orange-100 outline-none py-2 px-4 cursor-pointer text-lg font-semibold rounded-full border-2 border-orange-600 flex-1"
        />
      </div>
    );
  };

  const dataDisplay = () => {
    return (
      <div className="w-full">
        {data?.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full">
            {data.map((menu) => (
              <div key={menu._id} className="">
                <MenuCard menu={menu} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyView message="No Menu Items Found" />
        )}
      </div>
    );
  };

  const dataHandler = () => {
    if (isLoading) return <Loader />;
    if (error) return <ErrorBox message={error.message} />;
    return dataDisplay();
  };

  return (
    <div className="flex flex-col items-center w-full p-4 justify-center">
      <h1 className="sm:text-2xl text-xl font-bold text-teal-600 text-start w-full">
        Menu Management
      </h1>
      {viewMenuForm && <MenuForm />}
      {totalMenuPart()}
      {filterPart()}
      {dataHandler()}
    </div>
  );
};

export default MenuManagement;
