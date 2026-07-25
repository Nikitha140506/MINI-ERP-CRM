import express from "express";

import {
    getProfile,
    updateProfile,
    changePassword
} from "../controllers/user.controller";

import authMiddleware from "../middleware/auth.middleware";


const router = express.Router();


// Debug check (remove later)
console.log({
    authMiddleware,
    getProfile,
    updateProfile,
    changePassword
});


// Get logged-in user profile
router.get(
    "/profile",
    authMiddleware,
    getProfile
);


// Update profile details
router.put(
    "/profile",
    authMiddleware,
    updateProfile
);


// Change password
router.put(
    "/change-password",
    authMiddleware,
    changePassword
);


export default router;