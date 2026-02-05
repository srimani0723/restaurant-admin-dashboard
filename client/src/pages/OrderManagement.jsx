import React from "react";
import OrderCard from "../components/OrderCard";
import useFetch from "../hooks/useFetch";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Loader from "../components/Loader";
import ErrorBox from "../components/ErrorBox";

const OrderManagement = () => {
  const [status, setStatus] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(5);
  const { query } = useFetch({
    url: `/api/orders?status=${status === "All" ? "" : status}&page=${page}&limit=${limit}`,
    method: "GET",
  });
  const { data: orders, isLoading, error } = query;

  const filterPart = () => {
    const statusList = [
      "All",
      "Pending",
      "Preparing",
      "Ready",
      "Delivered",
      "Cancelled",
    ];
    return (
      <div className="w-full my-3 flex md:flex-row flex-col flex-wrap gap-4 pl-5 pr-5">
        <select
          onChange={(e) => setStatus(e.target.value)}
          value={status}
          className="bg-orange-100 outline-none py-2 px-4 cursor-pointer text-lg font-semibold rounded-full border-2 border-orange-600 flex-1"
        >
          {statusList.map((status) => (
            <option
              className="bg-orange-100 cursor-pointer rounded-2xl"
              key={status}
              value={status}
            >
              {status}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => setLimit(e.target.value)}
          value={limit}
          className="bg-orange-100 outline-none py-2 px-4 cursor-pointer text-lg font-semibold rounded-full border-2 border-orange-600 flex-1"
        >
          {[5, 10, 15, 20].map((limit) => (
            <option
              className="bg-orange-100 cursor-pointer rounded-2xl"
              key={limit}
              value={limit}
            >
              {limit}
            </option>
          ))}
        </select>
      </div>
    );
  };

  const onSuccessView = () => (
    <>
      {filterPart()}
      <ul className="flex flex-col gap-5 p-5">
        {orders?.map((order) => (
          <li key={order._id}>
            <OrderCard order={order} />
          </li>
        ))}
      </ul>
      <div className=" flex items-center justify-center gap-2 fixed bottom-2 bg-[#d4540a8c] backdrop-blur-sm ml-[40%] p-2 rounded-full">
        <button
          className="cursor-pointer"
          onClick={() => {
            page > 1 && setPage(page - 1);
          }}
          disabled={page === 1}
        >
          <ChevronLeft className="text-2xl text-white" strokeWidth={5} />
        </button>
        <p className="text-white font-bold text-xl">{page}</p>
        <button
          className="cursor-pointer"
          onClick={() => setPage(page + 1)}
          disabled={orders?.length < limit}
        >
          <ChevronRight className="text-2xl text-white" strokeWidth={5} />
        </button>
      </div>
    </>
  );

  const handleView = () => {
    if (isLoading) return <Loader />;
    if (error) return <ErrorBox message={error.message} />;
    return onSuccessView();
  };

  return (
    <div className="">
      <h1 className="font-bold text-2xl my-2 pl-5 pt-5">Order Management</h1>
      {handleView()}
    </div>
  );
};

export default OrderManagement;
