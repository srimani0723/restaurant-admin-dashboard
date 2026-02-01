import mongoose from "mongoose";
import MenuItem from "../models/MenuItem.js";
import Order from "../models/Order.js";
import connectDB from "../config/db.js";

const IMAGE_URL =
  "https://res-console.cloudinary.com/ddlwx2lmy/thumbnails/v1/image/upload/v1739549953/c2FtcGxlcy9kZXNzZXJ0LW9uLWEtcGxhdGU=/drilldown";

const seedMenuItems = [
  {
    name: "Chicken Curry",
    description: "Spicy chicken curry with Indian spices",
    category: "Main Course",
    price: 250,
    ingredients: ["chicken", "onion", "tomato", "spices"],
    preparationTime: 30,
    imageUrl: IMAGE_URL,
  },
  {
    name: "Veg Biryani",
    description: "Fragrant rice with mixed vegetables",
    category: "Main Course",
    price: 200,
    ingredients: ["rice", "carrot", "peas", "beans"],
    preparationTime: 25,
    imageUrl: IMAGE_URL,
  },
  {
    name: "Paneer Tikka",
    description: "Grilled paneer cubes marinated in spices",
    category: "Appetizer",
    price: 180,
    ingredients: ["paneer", "yogurt", "spices"],
    preparationTime: 20,
    imageUrl: IMAGE_URL,
  },
  {
    name: "French Fries",
    description: "Crispy golden fries",
    category: "Appetizer",
    price: 120,
    ingredients: ["potato", "salt", "oil"],
    preparationTime: 10,
    imageUrl: IMAGE_URL,
  },
  {
    name: "Chocolate Cake",
    description: "Rich chocolate layered cake",
    category: "Dessert",
    price: 150,
    ingredients: ["flour", "cocoa", "sugar"],
    preparationTime: 40,
    imageUrl: IMAGE_URL,
  },
  {
    name: "Ice Cream Sundae",
    description: "Vanilla ice cream with toppings",
    category: "Dessert",
    price: 100,
    ingredients: ["milk", "sugar", "cream"],
    preparationTime: 5,
    imageUrl: IMAGE_URL,
  },
  {
    name: "Mango Lassi",
    description: "Refreshing mango yogurt drink",
    category: "Beverage",
    price: 80,
    ingredients: ["mango", "yogurt", "sugar"],
    preparationTime: 5,
    imageUrl: IMAGE_URL,
  },
  {
    name: "Cold Coffee",
    description: "Chilled coffee with ice cream",
    category: "Beverage",
    price: 90,
    ingredients: ["coffee", "milk", "ice cream"],
    preparationTime: 5,
    imageUrl: IMAGE_URL,
  },
  {
    name: "Spring Rolls",
    description: "Crispy rolls stuffed with veggies",
    category: "Appetizer",
    price: 140,
    ingredients: ["cabbage", "carrot", "flour"],
    preparationTime: 15,
    imageUrl: IMAGE_URL,
  },
  {
    name: "Grilled Sandwich",
    description: "Cheese and veggie grilled sandwich",
    category: "Appetizer",
    price: 160,
    ingredients: ["bread", "cheese", "vegetables"],
    preparationTime: 12,
    imageUrl: IMAGE_URL,
  },
  {
    name: "Butter Naan",
    description: "Soft naan with butter topping",
    category: "Main Course",
    price: 50,
    ingredients: ["flour", "yeast", "butter"],
    preparationTime: 8,
    imageUrl: IMAGE_URL,
  },
  {
    name: "Dal Tadka",
    description: "Yellow lentils tempered with spices",
    category: "Main Course",
    price: 180,
    ingredients: ["lentils", "onion", "tomato", "spices"],
    preparationTime: 20,
    imageUrl: IMAGE_URL,
  },
  {
    name: "Gulab Jamun",
    description: "Sweet fried dumplings soaked in syrup",
    category: "Dessert",
    price: 120,
    ingredients: ["milk powder", "sugar", "cardamom"],
    preparationTime: 30,
    imageUrl: IMAGE_URL,
  },
  {
    name: "Masala Chai",
    description: "Indian spiced tea",
    category: "Beverage",
    price: 40,
    ingredients: ["tea leaves", "milk", "spices"],
    preparationTime: 7,
    imageUrl: IMAGE_URL,
  },
  {
    name: "Pasta Alfredo",
    description: "Creamy white sauce pasta",
    category: "Main Course",
    price: 220,
    ingredients: ["pasta", "cream", "cheese"],
    preparationTime: 25,
    imageUrl: IMAGE_URL,
  },
];

const seedOrders = (menuItems) => [
  {
    customerName: "Narayanam",
    tableNumber: 1,
    items: [
      { menuItem: menuItems[0]._id, quantity: 2, price: menuItems[0].price },
      { menuItem: menuItems[4]._id, quantity: 1, price: menuItems[4].price },
    ],
    totalAmount: 2 * menuItems[0].price + menuItems[4].price,
    status: "Pending",
  },
  {
    customerName: "Ravi",
    tableNumber: 2,
    items: [
      { menuItem: menuItems[1]._id, quantity: 1, price: menuItems[1].price },
      { menuItem: menuItems[2]._id, quantity: 2, price: menuItems[2].price },
    ],
    totalAmount: menuItems[1].price + 2 * menuItems[2].price,
    status: "Preparing",
  },
  {
    customerName: "Priya",
    tableNumber: 3,
    items: [
      { menuItem: menuItems[5]._id, quantity: 3, price: menuItems[5].price },
    ],
    totalAmount: 3 * menuItems[5].price,
    status: "Delivered",
  },
  {
    customerName: "Suresh",
    tableNumber: 4,
    items: [
      { menuItem: menuItems[6]._id, quantity: 2, price: menuItems[6].price },
      { menuItem: menuItems[7]._id, quantity: 1, price: menuItems[7].price },
    ],
    totalAmount: 2 * menuItems[6].price + menuItems[7].price,
    status: "Ready",
  },
  {
    customerName: "Anita",
    tableNumber: 5,
    items: [
      { menuItem: menuItems[8]._id, quantity: 2, price: menuItems[8].price },
    ],
    totalAmount: 2 * menuItems[8].price,
    status: "Cancelled",
  },
  {
    customerName: "Rahul",
    tableNumber: 6,
    items: [
      { menuItem: menuItems[9]._id, quantity: 1, price: menuItems[9].price },
      { menuItem: menuItems[10]._id, quantity: 4, price: menuItems[10].price },
    ],
    totalAmount: menuItems[9].price + 4 * menuItems[10].price,
    status: "Pending",
  },
  {
    customerName: "Meena",
    tableNumber: 7,
    items: [
      { menuItem: menuItems[11]._id, quantity: 2, price: menuItems[11].price },
    ],
    totalAmount: 2 * menuItems[11].price,
    status: "Delivered",
  },
  {
    customerName: "Vikram",
    tableNumber: 8,
    items: [
      { menuItem: menuItems[12]._id, quantity: 3, price: menuItems[12].price },
    ],
    totalAmount: 3 * menuItems[12].price,
    status: "Preparing",
  },
  {
    customerName: "Sneha",
    tableNumber: 9,
    items: [
      { menuItem: menuItems[13]._id, quantity: 2, price: menuItems[13].price },
    ],
    totalAmount: 2 * menuItems[13].price,
    status: "Ready",
  },
  {
    customerName: "Arjun",
    tableNumber: 10,
    items: [
      { menuItem: menuItems[14]._id, quantity: 1, price: menuItems[14].price },
    ],
    totalAmount: menuItems[14].price,
    status: "Pending",
  },
];

const seedData = async () => {
  try {
    await connectDB();

    await MenuItem.deleteMany({});
    await Order.deleteMany({});

    const insertedMenuItems = await MenuItem.insertMany(seedMenuItems);
    console.log("Inserted menu items");

    const orders = seedOrders(insertedMenuItems);
    await Order.insertMany(orders);

    console.log("Inserted orders");

    mongoose.connection.close();
    console.log("Data seeded successfully");
  } catch (error) {
    console.log(error);
    mongoose.connection.close();
  }
};
seedData();
