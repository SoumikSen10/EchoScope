import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { getReviews } from "../controllers/review.controller.js";

const router = Router();

// secured routes
//router.route("/get-reviews").post(verifyJWT, getReviews);
router.route("/get-reviews").post(getReviews);

export default router;
