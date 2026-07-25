import { Router } from "express";

import {
    getInventory,
    addStock,
    removeStock,
    lowStock
} from "../controllers/inventory.controller";

import authMiddleware from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";


const router = Router();


// View inventory
router.get(
    "/",
    authMiddleware,
    authorizeRoles(
        "ADMIN",
        "WAREHOUSE"
    ),
    getInventory
);



// Low stock products
router.get(
    "/low-stock",
    authMiddleware,
    authorizeRoles(
        "ADMIN",
        "WAREHOUSE"
    ),
    lowStock
);



// Add stock
router.put(
    "/add/:id",
    authMiddleware,
    authorizeRoles(
        "ADMIN",
        "WAREHOUSE"
    ),
    addStock
);



// Remove stock
router.put(
    "/remove/:id",
    authMiddleware,
    authorizeRoles(
        "ADMIN",
        "WAREHOUSE"
    ),
    removeStock
);


export default router;