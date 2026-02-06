import React from "react";
import { CircleX } from "lucide-react";
import { toggleMenuFormView } from "../Redux/menuFormSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  setName,
  setDescription,
  setCategory,
  setPrice,
  setIngredients,
  setPreparationTime,
  setIsAvailable,
  setImage,
  clearExistingMenu,
} from "../Redux/menuFormSlice";
import useFetch from "../hooks/useFetch";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

const MenuForm = () => {
  const dispatch = useDispatch();
  const { existingMenu } = useSelector((state) => state.menuForm);
  const {
    name,
    description,
    category,
    price,
    ingredients,
    preparationTime,
    isAvailable,
    image,
  } = useSelector((state) => state.menuForm);
  const [file, setFile] = React.useState(image ? image : null);

  const url = existingMenu ? `/api/menu/${existingMenu._id}` : `/api/menu`;
  const method = existingMenu ? "PUT" : "POST";

  const { mutation } = useFetch({
    url,
    method,
    headers: { "Content-Type": "multipart/form-data" },
  });
  const { mutate, isPending } = mutation;

  const handleForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    formData.append("ingredients", ingredients);
    formData.append("preparationTime", preparationTime);
    formData.append("isAvailable", isAvailable);
    formData.append("image", file);

    mutate(formData, {
      onSuccess: () => {
        toast.success(`${name} added successfully`);
        dispatch(toggleMenuFormView());
        dispatch(clearExistingMenu());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return (
    <div
      className={`bg-[#00000025] p-4 h-full w-full fixed top-0 left-0 z-50 flex justify-center items-center backdrop-blur-sm`}
    >
      <form
        className="bg-white p-4 rounded-xl gap-2 flex flex-col overflow-auto h-3/4"
        onSubmit={handleForm}
      >
        <div className="flex justify-between">
          <h1 className="text-xl font-bold text-teal-600">MenuForm</h1>
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => {
              dispatch(toggleMenuFormView());
              dispatch(clearExistingMenu());
            }}
          >
            <CircleX className="text-teal-600" />
          </button>
        </div>

        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter Menu Name"
            value={name}
            onChange={(e) => dispatch(setName(e.target.value))}
            className="outline-none border-2 border-teal-600 p-2 rounded-lg"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Enter Menu Description"
            value={description}
            onChange={(e) => dispatch(setDescription(e.target.value))}
            className="outline-none border-2 border-teal-600 p-2 rounded-lg"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="category">Category</label>
          <select
            className="outline-none border-2 border-teal-600 p-2 rounded-lg"
            value={category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            <option value="">Select Category</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            placeholder="Enter Menu Price"
            value={price}
            onChange={(e) => dispatch(setPrice(e.target.value))}
            className="outline-none border-2 border-teal-600 p-2 rounded-lg"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="ingredients">Ingredients</label>
          <input
            type="text"
            id="ingredients"
            placeholder="Ingredients ',' separeated"
            value={ingredients}
            onChange={(e) => dispatch(setIngredients(e.target.value))}
            className="outline-none border-2 border-teal-600 p-2 rounded-lg"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="" htmlFor="preparationTime">
            preparationTime
          </label>
          <input
            type="number"
            id="preparationTime"
            placeholder="Enter Preparation Time"
            value={preparationTime}
            onChange={(e) => dispatch(setPreparationTime(e.target.value))}
            className="outline-none border-2 border-teal-600 p-2 rounded-lg"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="isAvailable">Is Available</label>
          <select
            className="outline-none border-2 border-teal-600 p-2 rounded-lg"
            value={isAvailable}
            onChange={(e) => dispatch(setIsAvailable(e.target.value))}
          >
            <option value="">Select Availability</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            placeholder="Enter Menu Image"
            onChange={(e) => setFile(e.target.files[0])}
            className="outline-none border-2 border-teal-600 p-2 rounded-lg"
          />
          {/* display uploaded image */}
          <div className="mt-2 flex justify-center gap-2">
            {file && typeof file !== "string" && (
              <div className="flex flex-col items-center">
                <label className="text-teal-600 font-bold">Preview</label>

                <img
                  src={URL.createObjectURL(file)}
                  alt="uploaded image"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
            )}
            {typeof image === "string" && image && (
              <div className="flex flex-col items-center">
                <label className="text-green-600 font-bold">Previous</label>

                <img
                  src={image}
                  alt="uploaded image"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        <button
          className="bg-teal-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-teal-700 transition-colors cursor-pointer my-2"
          type="submit"
        >
          {existingMenu ? "Update Menu" : "Add Menu"}
        </button>

        {isPending && (
          <p className="text-teal-600">
            <Loader />
          </p>
        )}
      </form>
    </div>
  );
};

export default MenuForm;
