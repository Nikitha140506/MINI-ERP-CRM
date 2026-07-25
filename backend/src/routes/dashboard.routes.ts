import { Router } from "express";


import {
    getDashboard
} from "../controllers/dashboard.controller";


import authMiddleware from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";


const router = Router();



// Dashboard
router.get(
    "/",
    authMiddleware,
    authorizeRoles(
        "ADMIN",
        "SALES",
        "WAREHOUSE",
        "ACCOUNTS"
    ),
    getDashboard
);



export default router;