import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";
import MenuCard from "../components/MenuCard";

const Dashboard = () => {
  const { query } = useFetch({ url: "/api/analytics/top-sellers" });
  const { data, isLoading, error } = query;

  const displayData = () => {
    const totalRevenue = data.reduce((acc, menu) => {
      return acc + menu.itemDetails.price * menu.totalQty;
    }, 0);

    const totalItemsSold = data.reduce((acc, menu) => {
      return acc + menu.totalQty;
    }, 0);

    return (
      <>
        <div className="flex flex-col w-fit h-full p-4  bg-teal-100 border-2 border-teal-400 rounded-xl">
          <h1 className="text-2xl font-bold text-teal-600 mb-3">Analytics</h1>
          <div className=" flex w-fit text-red-900">
            <div className="text-lg font-bold mr-4 flex flex-col bg-orange-300 p-2 rounded-xl">
              <h3>Total Revenue:</h3>
              <p className="text-center text-4xl">{totalRevenue}</p>
            </div>
            <div className="text-lg font-bold flex flex-col bg-orange-300 p-2 rounded-xl">
              <h3>Total Items Sold:</h3>
              <p className="text-center text-4xl">{totalItemsSold}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 w-full">
          {data.map((menu) => {
            return <MenuCard key={menu._id} menu={menu.itemDetails} />;
          })}
        </div>
      </>
    );
  };

  const displayHandler = () => {
    if (isLoading) return <Loader />;
    if (error) return <ErrorBox message={error.message} />;
    return displayData();
  };

  return (
    <div className="flex flex-col w-full p-4 justify-center">
      <h1 className="sm:text-4xl text-2xl font-bold text-teal-600 mb-3">
        Restaurant Admin Dashboard
      </h1>
      {displayHandler()}
    </div>
  );
};

export default Dashboard;
