import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      autoGenerate: true,
    },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
        },
      },
    ],
    totalAmount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Pending", "Preparing", "Ready", "Delivered", "Cancelled"],
      default: "Pending",
    },
    customerName: {
      type: String,
    },
    tableNumber: {
      type: Number,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
