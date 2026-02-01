import cloudinary from "../config/cloudinary.js";

export const cloudinaryUpload = async (req, res, next) => {
  if (!req.file) {
    req.imageUrl = undefined;
    return next();
  }
  try {
    // Convert buffer to base64 data URI
    const base64 = req.file.buffer.toString("base64");
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: "restaurant-admin-dashboard-menu-items",
      format: "jpg",
    });

    req.imageUrl = result.url; // attach URL to request
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
