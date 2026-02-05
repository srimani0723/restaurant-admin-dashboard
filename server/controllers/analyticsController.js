import Order from "../models/Order.js";

const getTopSellers = async (request, response) => {
  try {
    const result = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.menuItem", // collapsing items.menuItem to _id
          totalQty: { $sum: "$items.quantity" },
        },
      },
      // it looks like after grouping eg: { _id: "679c1f1f6180617874940911", totalQty: 5 }
      // now we need to get the details of the menu item
      {
        $lookup: {
          from: "menuitems",
          localField: "_id",
          foreignField: "_id",
          as: "itemDetails",
        },
      },
      { $unwind: "$itemDetails" },

      { $sort: { totalQty: -1, "itemDetails.price": -1 } },
      { $limit: 5 },
    ]);

    return response.status(200).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error", error });
  }
};

export default getTopSellers;
