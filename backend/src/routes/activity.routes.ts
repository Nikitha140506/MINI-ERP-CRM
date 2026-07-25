import { Router } from "express";
import prisma from "../config/prisma";
import  authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
    });

    const sales = await prisma.sale.findMany({
      take: 3,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: true,
      },
    });

    const products = await prisma.product.findMany({
      take: 3,
      orderBy: {
        updatedAt: "desc",
      },
    });

    const activities = [
      ...customers.map((c) => ({
        type: "Customer",
        title: `New customer ${c.name}`,
        time: c.createdAt,
      })),

      ...sales.map((s) => ({
        type: "Sale",
        title: `Sale to ${s.customer?.name}`,
        time: s.createdAt,
      })),

      ...products.map((p) => ({
        type: "Product",
        title: `${p.name} updated`,
        time: p.updatedAt,
      })),
    ];

    activities.sort(
      (a, b) =>
        new Date(b.time).getTime() -
        new Date(a.time).getTime()
    );

    res.json({
      success: true,
      activities,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

export default router;