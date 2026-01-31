import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    description: { type: String },
    category: {
      type: String,
      enum: ["Appetizer", "Main Course", "Dessert", "Beverage"],
      required: true,
    },
    price: { type: Number, required: true },
    ingredients: { type: [String] },
    isAvailable: { type: Boolean, default: true },
    preparationTime: { type: Number }, //in minutes
    imageUrl: { type: String },
  },
  { timestamps: true },
);

menuItemSchema.index({ name: "text", ingredients: "text" });

export default mongoose.model("MenuItem", menuItemSchema);
