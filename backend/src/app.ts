import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import analyticsRoutes from "./routes/analytics.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import customerRoutes from "./routes/customer.routes";
import productRoutes from "./routes/product.routes";
import saleRoutes from "./routes/sale.routes";
import adminRoutes from "./routes/admin.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import invoiceRoutes from "./routes/invoice.routes";
import searchRoutes from "./routes/search.routes";
import inventoryRoutes from "./routes/inventory.routes";
import activityRoutes from "./routes/activity.routes";
import supplierRoutes from "./routes/supplier.routes"; // NEW

import purchaseRoutes from "./routes/purchase.routes";
import accountsRoutes from "./routes/accounts.routes";

dotenv.config();

const app = express();

// =====================
// Middlewares
// =====================
app.use(cors());
app.use(express.json());

// =====================
// API Routes
// =====================

app.use("/api/auth", authRoutes);

app.use("/api/users", userRoutes);

app.use("/api/customers", customerRoutes);

app.use("/api/products", productRoutes);

app.use("/api/suppliers", supplierRoutes); // NEW

app.use("/api/sales", saleRoutes);

app.use("/api/inventory", inventoryRoutes);

app.use("/api/invoices", invoiceRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/search", searchRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/activity", activityRoutes);

app.use(
    "/api/purchases",
    purchaseRoutes
);

app.use(
    "/api/accounts",
    accountsRoutes
);

// =====================
// Home Route
// =====================

app.get("/", (req, res) => {
    res.json({
        success: true,
        project: "Mini ERP CRM",
        version: "1.0.0",
        message: "🚀 API Running Successfully",
    });
});

// =====================
// Error Handler
// =====================

app.use(
    (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
);

export default app;