import { Router } from "express";

import {
    createCustomerController,
    getAllCustomersController,
    getCustomerByIdController,
    updateCustomerController,
    deleteCustomerController
} from "../controllers/customer.controller";

import authMiddleware from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";


const router = Router();



// CREATE CUSTOMER
// ADMIN + SALES
router.post(
    "/",
    authMiddleware,
    authorizeRoles("ADMIN","SALES"),
    createCustomerController
);



// GET ALL CUSTOMERS
// ADMIN + SALES
router.get(
    "/",
    authMiddleware,
    authorizeRoles("ADMIN","SALES"),
    getAllCustomersController
);



// GET CUSTOMER BY ID
// ADMIN + SALES
router.get(
    "/:id",
    authMiddleware,
    authorizeRoles("ADMIN","SALES"),
    getCustomerByIdController
);



// UPDATE CUSTOMER
// ADMIN + SALES
router.put(
    "/:id",
    authMiddleware,
    authorizeRoles("ADMIN","SALES"),
    updateCustomerController
);



// DELETE CUSTOMER
// ONLY ADMIN
router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles("ADMIN"),
    deleteCustomerController
);



export default router;