import prisma from "../config/prisma";

export const getInventoryService = async () => {
    return await prisma.product.findMany({
        orderBy: {
            name: "asc"
        }
    });
};

export const addStockService = async (
    productId: string,
    quantity: number
) => {

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });

    if (!product) {
        throw new Error("Product not found");
    }

    return await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            stock: product.stock + quantity
        }
    });
};

export const removeStockService = async (
    productId: string,
    quantity: number
) => {

    const product = await prisma.product.findUnique({
        where: {
            id: productId
        }
    });

    if (!product) {
        throw new Error("Product not found");
    }

    if (product.stock < quantity) {
        throw new Error("Insufficient stock");
    }

    return await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            stock: product.stock - quantity
        }
    });
};

export const lowStockService = async () => {
    return await prisma.product.findMany({
        where: {
            stock: {
                lte: 5
            }
        },
        orderBy: {
            stock: "asc"
        }
    });
};