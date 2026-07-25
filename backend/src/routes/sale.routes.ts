import { Router } from "express";

import {
  createSale,
  getAllSales,
  getSaleById,
  deleteSale,
} from "../controllers/sale.controller";


import authMiddleware from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";


const router = Router();



// GET ALL SALES
// ADMIN + SALES
router.get(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN","SALES"),
  getAllSales
);



// CREATE SALE
// ADMIN + SALES
router.post(
  "/",
  authMiddleware,
  authorizeRoles("ADMIN","SALES"),
  createSale
);



// GET SALE BY ID
// ADMIN + SALES
router.get(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN","SALES"),
  getSaleById
);



// DELETE SALE
// ONLY ADMIN
router.delete(
  "/:id",
  authMiddleware,
  authorizeRoles("ADMIN"),
  deleteSale
);



export default router;