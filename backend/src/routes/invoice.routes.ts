import { Router } from "express";


import {
    createInvoiceController,
    getAllInvoicesController,
    deleteInvoiceController
} from "../controllers/invoice.controller";


import authMiddleware from "../middleware/auth.middleware";
import { authorizeRoles } from "../middleware/role.middleware";


const router = Router();



// CREATE INVOICE
// ADMIN + SALES + ACCOUNTS
router.post(
    "/",
    authMiddleware,
    authorizeRoles(
        "ADMIN",
        "SALES",
        "ACCOUNTS"
    ),
    createInvoiceController
);



// GET ALL INVOICES
// ADMIN + SALES + ACCOUNTS
router.get(
    "/",
    authMiddleware,
    authorizeRoles(
        "ADMIN",
        "SALES",
        "ACCOUNTS"
    ),
    getAllInvoicesController
);



// DELETE INVOICE
// ONLY ADMIN
router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles("ADMIN"),
    deleteInvoiceController
);



export default router;