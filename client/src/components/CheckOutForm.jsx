import React, { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import { CheckCircle, CircleX } from "lucide-react";
import { useDispatch } from "react-redux";
import { clearCart, toggleCheckOutFormView } from "../Redux/cartSlice";

const CheckOutForm = ({ items }) => {
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const dispatch = useDispatch();

  const debouncedCustomerName = useDebounce(customerName, 500);
  const debouncedTableNumber = useDebounce(tableNumber, 500);

  const { mutation, isPending, error, success } = useFetch({
    url: "/api/orders",
    method: "POST",
  });

  const handleCheckOut = (e) => {
    e.preventDefault();
    const data = {
      items: items.map((each) => {
        return {
          menuItem: each._id,
          quantity: each.quantity,
          price: each.price,
        };
      }),
      customerName: debouncedCustomerName,
      tableNumber: debouncedTableNumber,
    };

    if (debouncedCustomerName && debouncedTableNumber) {
      mutation.mutate(data, {
        onSuccess: () => {
          dispatch(toggleCheckOutFormView());
          dispatch(clearCart());
        },
      });
    }
  };

  return (
    <div className="flex bg-[#00000025] z-10 fixed flex-col gap-5 w-full h-screen justify-center items-center">
      <div className="flex flex-col bg-white rounded-2xl p-4 sm:flex-row relative">
        {items.length > 0 && (
          <div className=" sm:border-r  sm:border-gray-300 sm:pr-4 sm:mr-4 flex flex-col gap-2 border-b border-gray-300 mb-2 pb-2 overflow-auto max-h-[250px]">
            {items.map((item) => (
              <div key={item._id} className="flex gap-2">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-25 h-25 object-cover"
                />
                <p className="">
                  {item.name} - {item.quantity}
                </p>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleCheckOut}>
          <button
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => dispatch(toggleCheckOutFormView())}
            type="button"
          >
            <CircleX className="text-teal-700" strokeWidth={3} />
          </button>
          <div className="flex flex-col gap-2">
            <label htmlFor="customerName">Customer Name</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="tableNumber">Table Number</label>
            <input
              type="text"
              id="tableNumber"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <button
            className="bg-teal-500 py-2 px-4 rounded-lg text-white cursor-pointer hover:bg-teal-600 mt-2 w-full"
            type="submit"
          >
            {isPending ? (
              <Loader />
            ) : success ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              "Checkout"
            )}
          </button>

          {error && <p>{error.message}</p>}
        </form>
      </div>
    </div>
  );
};

export default CheckOutForm;
