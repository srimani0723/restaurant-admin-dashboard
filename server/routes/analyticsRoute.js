import express from "express";
import getTopSellers from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/top-sellers", getTopSellers);

export default router;
