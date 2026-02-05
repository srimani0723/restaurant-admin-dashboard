import React, { useState } from "react";

import {
  EllipsisVertical,
  Pencil,
  Trash,
  ShoppingBasket,
  ToggleLeftIcon,
  ToggleRightIcon,
} from "lucide-react";
import useFetch from "../hooks/useFetch";
import { useDispatch } from "react-redux";
import { setExistingMenu, toggleMenuFormView } from "../Redux/menuFormSlice";
import { addToCart } from "../Redux/cartSlice";

const MenuCard = ({ menu }) => {
  const [minimise, toggleMinimise] = useState(false);
  const [moreOptions, toggleMoreOptions] = useState(false);
  const {
    name,
    price,
    imageUrl,
    ingredients,
    isAvailable,
    category,
    description,
  } = menu;

  const [isAvailableState, setIsAvailableState] = useState(isAvailable);

  React.useEffect(() => {
    setIsAvailableState(isAvailable);
  }, [isAvailable]);

  const deleteMutation = useFetch({
    url: `/api/menu/${menu._id}`,
    method: "DELETE",
  });

  const toggleMutation = useFetch({
    url: `/api/menu/${menu._id}/availability`,
    method: "PATCH",
  });

  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setExistingMenu(menu));
    dispatch(toggleMenuFormView());
    toggleMoreOptions(false);
  };

  const handleDelete = () => {
    deleteMutation.mutation.mutate(null, {
      onSuccess: () => {
        toggleMoreOptions(false);
      },
    });
  };

  const handleAvailabilityToggle = () => {
    setIsAvailableState(!isAvailableState);
    toggleMutation.mutation.mutate(null, {
      onSuccess: () => {
        toggleMoreOptions(false);
      },
    });
  };

  const handleCart = () => {
    dispatch(addToCart(menu));
    toggleMoreOptions(false);
  };

  return (
    <div key={menu.id} className="group relative ">
      <div className="relative">
        <img
          alt={name}
          src={imageUrl}
          className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:aspect-auto lg:h-80 rounded-t-xl"
        />
        <button
          onClick={() => toggleMoreOptions(!moreOptions)}
          className="p-2 text-md font-semibold cursor-pointer absolute top-2 right-2 text-white bg-[#0b0b0b91] rounded-full"
        >
          <EllipsisVertical size={25} color="white" strokeWidth={3} />
        </button>

        {moreOptions && (
          <div className="absolute top-15 right-2 flex flex-col gap-2 bg-[#0b0b0b91] p-2 rounded-xl">
            <button
              className="bg-sky-500 text-white rounded-full py-1 px-3 text-md font-semibold cursor-pointer flex items-center gap-1"
              onClick={handleEdit}
            >
              <Pencil size={20} color="white" strokeWidth={3} />
              Edit
            </button>

            <button
              className="bg-red-500 text-white rounded-full py-1 px-3 text-md font-semibold cursor-pointer flex items-center gap-1"
              onClick={handleDelete}
            >
              <Trash size={20} color="white" strokeWidth={3} />
              Delete
            </button>

            <button
              className="bg-teal-500 text-white rounded-full py-1 px-3 text-md font-semibold cursor-pointer flex items-center gap-1"
              onClick={handleCart}
            >
              <ShoppingBasket size={20} color="white" strokeWidth={3} />
              Add to Cart
            </button>
          </div>
        )}
      </div>

      <div className=" flex flex-col justify-between items-start bg-white p-3 rounded-b-xl shadow-lg/5">
        <div className="flex justify-between mb-2 w-full">
          <h3 className="text-lg font-semibold ">{name}</h3>

          <p className="text-md font-semibold text-red-900">
            ₹.<span className="text-lg font-bold">{price}</span>
          </p>
        </div>

        <div className="flex justify-between items-center w-full">
          <button
            className="text-sky-800 font-semibold cursor-pointer"
            onClick={() => toggleMinimise(!minimise)}
          >
            {minimise ? "Read Less" : "Read More"}
          </button>
          <button
            className=" rounded-full py-1 px-3 text-md font-semibold cursor-pointer transition-all duration-300 ease-in-out"
            onClick={handleAvailabilityToggle}
          >
            {isAvailableState ? (
              <ToggleRightIcon size={35} color="green" strokeWidth={3} />
            ) : (
              <ToggleLeftIcon size={35} color="red" strokeWidth={3} />
            )}
          </button>
        </div>

        {minimise && (
          <div className="w-full">
            <hr className="mt-2 w-full text-gray-300 h-1" />
            <p className="my-2 font-semibold">
              Category:
              <span className=" bg-pink-200 rounded-full p-1 px-3 text-sm font-semibold ml-2">
                {category}
              </span>
            </p>

            <hr className="mt-3 w-full text-gray-300 h-1" />
            <p className="mb-2 font-semibold">description:</p>
            <p className="mb-2">{description}</p>

            <hr className="w-full text-gray-300 h-1" />

            <p className="mb-2 font-semibold">ingredients:</p>
            <div className="flex flex-wrap gap-2">
              {ingredients.map((ingredient, index) => {
                return (
                  <p
                    key={index}
                    className="bg-green-200 rounded-full py-1 px-4 text-sm font-semibold"
                  >
                    {ingredient}
                  </p>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuCard;
