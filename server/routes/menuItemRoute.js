import express from "express";
import {
  getAllMenuItems,
  getMenuItemsBySearch,
  getMenuItemsById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
} from "../controllers/menuItemController.js";
import { upload } from "../config/multer.js";
import { cloudinaryUpload } from "../middleware/cloudinaryUpload.js";

const router = express.Router();

router.get("/", getAllMenuItems); //category, availability, price range
router.get("/search", getMenuItemsBySearch); // by name or ingredients

router.get("/:id", getMenuItemsById);

router.post("/", upload.single("image"), cloudinaryUpload, createMenuItem);

router.put("/:id", upload.single("image"), cloudinaryUpload, updateMenuItem);
router.delete("/:id", deleteMenuItem);
router.patch("/:id/availability", toggleAvailability); //toggle availability

export default router;
