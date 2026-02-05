import MenuItem from "../models/MenuItem.js";

export const getAllMenuItems = async (request, response) => {
  try {
    const { category, isAvailable, minPrice, maxPrice } = request.query;

    // eg: GET /api/menu?category=Dessert&isAvailable=true&minPrice=100&maxPrice=200
    // filters = {
    // category: "Dessert",
    // isAvailable: true,
    // price: { $gte: 100, $lte: 200 }
    // }

    const filter = {};
    if (category !== "All") filter.category = category;
    if (isAvailable !== undefined) filter.isAvailable = isAvailable === "true";

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const result = await MenuItem.find(filter);
    response.status(200).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const getMenuItemsBySearch = async (request, response) => {
  try {
    const { q = "" } = request.query;

    // if (!q)
    // return response.status(400).json({ message: "Search query is required" });

    // $text instead of $regex for better performance because of using index in MongoDB
    // eg: GET /api/menu/search?q=pasta
    // searchItems = {$text:{$search:"pasta"}}
    // if no q then return all menu items .find({}) gives all documents
    // if q is empty string then return all menu items

    const searchItems = q !== "" ? { $text: { $search: q } } : {};

    const result = await MenuItem.find(searchItems);

    response.status(200).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const getMenuItemsById = async (request, response) => {
  try {
    const { id } = request.params;

    const result = await MenuItem.findById(id);

    if (!result)
      return response.status(404).json({ message: "Menu item not found" });

    response.status(200).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const createMenuItem = async (request, response) => {
  try {
    const { name, description, ingredients, price, category, isAvailable } =
      request.body;

    const imageUrl = request.imageUrl
      ? request.imageUrl
      : "https://res-console.cloudinary.com/ddlwx2lmy/thumbnails/v1/image/upload/v1739549953/c2FtcGxlcy9kZXNzZXJ0LW9uLWEtcGxhdGU=/drilldown";

    const newMenuItem = {
      name,
      description,
      ingredients: ingredients.split(","),
      price,
      category,
      imageUrl,
      isAvailable,
    };

    console.log(newMenuItem);
    const result = await MenuItem.insertOne(newMenuItem);
    response
      .status(201)
      .json({ message: "Menu item created successfully", result });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: `Internal server error: ${error}` });
  }
};

export const updateMenuItem = async (request, response) => {
  try {
    const { id } = request.params;
    const {
      name,
      description,
      price,
      category,
      imageUrl,
      isAvailable,
      ingredients,
      preparationTime,
    } = request.body;

    const updatedMenuItem = {
      name,
      description,
      price,
      category,
      imageUrl: request.imageUrl ? request.imageUrl : imageUrl,
      isAvailable,
      ingredients:
        typeof ingredients === "string" ? ingredients.split(",") : ingredients,
      preparationTime,
    };

    // update the document where the _id = id

    const result = await MenuItem.updateOne(
      { _id: id },
      { $set: updatedMenuItem },
    );
    response
      .status(200)
      .json({ message: "Menu item updated successfully", result });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: `Internal server error: ${error}` });
  }
};

export const deleteMenuItem = async (request, response) => {
  try {
    const { id } = request.params;

    console.log(id);

    const result = await MenuItem.deleteOne({ _id: id });
    response
      .status(200)
      .json({ message: "Menu item deleted successfully", result });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const toggleAvailability = async (request, response) => {
  try {
    const { id } = request.params;
    const menuItem = await MenuItem.findById(id);
    if (!menuItem)
      return response.status(404).json({ message: "Menu item not found" });
    menuItem.isAvailable = !menuItem.isAvailable;
    const result = await menuItem.save();

    response
      .status(200)
      .json({ message: "Menu item availability toggled successfully", result });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};
