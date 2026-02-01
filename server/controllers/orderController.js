import Order from "../models/Order.js";

export const getAllOrders = async (request, response) => {
  try {
    const { status, page = 1, limit = 10 } = request.query;

    // eg: GET /api/orders?status=pending&page=1&limit=10
    // filter = {status:"pending"}
    // pagination = {page:1,limit:10}

    const filter = {};
    if (status) filter.status = status;

    const result = await Order.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

    response.status(200).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const getOrderById = async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Order.findById(id);

    if (!result)
      return response.status(404).json({ message: "Order not found" });

    response.status(200).json(result);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
};

export const createOrder = async (request, response) => {
  try {
    const { items, customerName, tableNumber } = request.body;

    if (!items || !customerName || !tableNumber)
      return response.status(400).json({ message: "All fields are required" });

    const totalAmount = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const newOrder = {
      items,
      totalAmount,
      customerName,
      tableNumber,
    };

    const result = await Order.insertOne(newOrder);
    response
      .status(201)
      .json({ message: "Order created successfully", result });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error", error });
  }
};

export const updateOrderStatus = async (request, response) => {
  try {
    const { id } = request.params;
    const { status } = request.body;

    const result = await Order.updateOne(
      { orderNumber: id },
      { $set: { status } },
    );

    response
      .status(200)
      .json({ message: "Order status updated successfully", result });
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error", error });
  }
};
