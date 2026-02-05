import React from "react";

import { removeFromCart, changeQuantity } from "../Redux/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
  const { name, price, imageUrl, _id, isAvailable } = item;
  const dispatch = useDispatch();

  const handleQuantityChange = (e) => {
    dispatch(
      changeQuantity({
        productId: item._id,
        quantity: e.target.value,
      }),
    );
  };

  // whole card should be in same height and image should same as card height
  // image should not be cropped

  return (
    <div className="flex items-start p-3 bg-white rounded-2xl shadow-md/10 h-60 relative w-full">
      <div className="flex w-1/5 h-full">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full rounded-2xl"
        />
      </div>

      <div className="flex w-4/5 flex-col flex-1 items-start gap-1 p-4  rounded-r-2xl">
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-red-800 font-bold">
          ₹{price}/-{" "}
          <span className={isAvailable ? "text-green-700" : "text-red-700"}>
            {isAvailable ? "In Stock" : "Out of Stock"}
          </span>
        </p>
        <div className="flex flex-col w-fit">
          <label className="font-semibold text-sm">Quantity</label>
          <input
            type="number"
            value={item.quantity}
            onChange={handleQuantityChange}
            className="p-1 bg-white rounded-md my-1"
          />
        </div>
        <button
          className="bg-red-700 py-1 px-3 rounded-full text-white cursor-pointer hover:bg-red-800"
          onClick={() => dispatch(removeFromCart(item))}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
