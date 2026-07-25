import { Router } from "express";

import {
 createPurchaseController,
 getAllPurchasesController,
 deletePurchaseController
} from "../controllers/purchase.controller";


import authMiddleware from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";


const router = Router();



// CREATE PURCHASE
// ADMIN + WAREHOUSE
router.post(
 "/",
 authMiddleware,
 authorizeRoles("ADMIN","WAREHOUSE"),
 createPurchaseController
);



// GET ALL PURCHASES
// ADMIN + WAREHOUSE
router.get(
 "/",
 authMiddleware,
 authorizeRoles("ADMIN","WAREHOUSE"),
 getAllPurchasesController
);



// DELETE PURCHASE
// ONLY ADMIN
router.delete(
 "/:id",
 authMiddleware,
 authorizeRoles("ADMIN"),
 deletePurchaseController
);



export default router;