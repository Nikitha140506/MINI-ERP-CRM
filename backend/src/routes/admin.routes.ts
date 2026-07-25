import { Router } from "express";

import { adminDashboard } from "../controllers/admin.controller";

import authMiddleware from "../middleware/auth.middleware";

import { authorizeRoles } from "../middleware/role.middleware";

const router = Router();

router.get(
    "/admin",
    authMiddleware,
    authorizeRoles("ADMIN"),
    adminDashboard
);

export default router;