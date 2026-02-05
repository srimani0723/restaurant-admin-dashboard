import React from "react";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import { ShoppingCart } from "lucide-react";
import CheckOutForm from "../components/CheckOutForm";
import { toggleCheckOutFormView } from "../Redux/cartSlice";

const Cart = () => {
  const { cartList } = useSelector((state) => state.cart);
  const { checkOutFormView } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const displayAllCartItems = () => {
    return cartList.length === 0 ? (
      <div className="flex flex-col items-center justify-center h-full">
        <ShoppingCart className="w-20 h-20 text-teal-400" />
        <p className="text-xl font-bold">Cart is empty</p>
        <p className="text-gray-500">Move to menu to add items</p>
      </div>
    ) : (
      <div className="p-4 pt-0 flex flex-col gap-5 h-full">
        <ul className="flex flex-col gap-5">
          {cartList.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </ul>
        <div className="flex flex-col gap-2 self-end">
          <p className="text-xl font-bold text-red-800">
            Total:{" ₹"}
            {cartList.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0,
            )}{" "}
            /-
          </p>
          <button
            className="bg-teal-500 py-2 px-4 rounded-lg text-white cursor-pointer hover:bg-teal-600 "
            onClick={() => dispatch(toggleCheckOutFormView())}
          >
            Checkout
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col relative gap-5 h-full w-full">
      <h1 className="text-2xl font-bold m-4">Cart</h1>
      {checkOutFormView && <CheckOutForm items={cartList} />}
      {displayAllCartItems()}
    </div>
  );
};

export default Cart;
