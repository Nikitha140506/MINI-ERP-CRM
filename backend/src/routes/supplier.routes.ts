import { Router } from "express";

import {
  createSupplierController,
  getAllSuppliersController,
  getSupplierByIdController,
  updateSupplierController,
  deleteSupplierController,
} from "../controllers/supplier.controller";

import authMiddleware from "../middleware/auth.middleware";


const router = Router();


// All supplier routes require authentication


router.post(
  "/",
  authMiddleware,
  createSupplierController
);


router.get(
  "/",
  authMiddleware,
  getAllSuppliersController
);


router.get(
  "/:id",
  authMiddleware,
  getSupplierByIdController
);


router.put(
  "/:id",
  authMiddleware,
  updateSupplierController
);


router.delete(
  "/:id",
  authMiddleware,
  deleteSupplierController
);


export default router;