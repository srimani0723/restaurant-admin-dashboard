import React from "react";
import useFetch from "../hooks/useFetch";

const OrderCard = ({ order }) => {
  const {
    orderNumber,
    customerName,
    tableNumber,
    status,
    createdAt,
    items,
    totalAmount,
  } = order;
  const [changeStatus, setChangeStatus] = React.useState(status);
  const { mutation } = useFetch({
    url: `/api/orders/${order._id}/status`,
    method: "PATCH",
  });

  const statusList = [
    "Pending",
    "Preparing",
    "Ready",
    "Delivered",
    "Cancelled",
  ];

  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString();

  const handleStatusChange = (status) => {
    setChangeStatus(status);
    mutation.mutate(
      {
        status,
      },
      {
        onSuccess: () => {
          alert("Status updated successfully");
        },
        onError: () => {
          alert("Failed to update status");
        },
      },
    );
  };

  return (
    <div className="bg-teal-100 p-3 rounded-lg border">
      <h1 className="text-md sm:text-lg font-bold mb-3">
        {orderNumber}
        {" - "}
        <span className="font-semibold text-orange-900">
          {formattedDate} {date.toLocaleTimeString()}
        </span>
      </h1>

      <div className="flex flex-col mb-3 sm:flex-row gap-2">
        <div className="flex flex-col gap-2 justify-evenly border p-3 rounded-lg bg-pink-100 flex-2 shadow-lg/5  text-md sm:text-lg lg:text-xl">
          <h1 className="font-bold text-md sm:text-lg">Customer Details:</h1>
          <p className="font-semibold"> Name: {customerName}</p>
          <p className="font-semibold">Table Number: {tableNumber}</p>
          <div className="font-semibold bg-green-200 w-fit p-1 rounded-lg border flex items-center gap-2">
            <p>Status:</p>
            <select
              className="bg-transparent border-none outline-none"
              value={changeStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              {statusList.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-orange-200 border shadow-lg/5   p-2 rounded-lg flex-3 text-sm sm:text-md lg:text-xl">
          <h3 className="font-bold text-md sm:text-lg">Products:</h3>
          {items.map((item) => (
            <div
              className="flex items-center p-2 rounded-lg gap-2 my-1 border-orange-800 border-2 justify-between text-sm sm:text-md lg:text-lg"
              key={item._id}
            >
              <p className="font-medium sm:font-semibold flex justify-between w-full">
                {item.menuItem} - {item.quantity} * {item.price}
                <span className="">
                  {" = "}
                  ₹.{item.quantity * item.price}
                </span>
              </p>
            </div>
          ))}
          <p className="font-semibold text-md sm:text-lg text-right p-2">
            Total Amount: ₹.{totalAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
