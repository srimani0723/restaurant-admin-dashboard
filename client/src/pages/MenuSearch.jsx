import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";
import MenuCard from "../components/MenuCard";
import { Search } from "lucide-react";
import useDebounce from "../hooks/useDebounce";
import { useState } from "react";

const MenuSearch = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { query } = useFetch({
    url: `/api/menu/search?q=${debouncedSearch}`,
    enabled: !!debouncedSearch,
  });
  const { data, isLoading, error } = query;

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const dataDisplay = () => {
    return (
      <>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {data.map((menu) => (
            <div key={menu._id} className="">
              <MenuCard menu={menu} />
            </div>
          ))}
        </div>
      </>
    );
  };

  const dataHandler = () => {
    if (isLoading) return <Loader />;
    if (error) return <ErrorBox message={error.message} />;
    return dataDisplay();
  };

  return (
    <div className="flex flex-col items-center w-full h-full p-4 justify-cente">
      <h1 className="sm:text-2xl text-xl font-bold text-teal-600">
        Menu Search
      </h1>
      <div className="flex w-full justify-between mt-2">
        <div className="flex items-center bg-teal-200 py-2 px-4 rounded-xl font-bold text-teal-600">
          Total Menu:
          <span className="text-center text-2xl">{data?.length || 0}</span>
        </div>
        <div className="flex items-center gap-2 border-2 border-teal-600 rounded-xl px-2">
          <Search size={20} />
          <input
            type="search"
            value={search}
            onChange={handleSearch}
            className="outline-none text-lg"
          />
        </div>
      </div>
      {dataHandler()}
    </div>
  );
};

export default MenuSearch;
