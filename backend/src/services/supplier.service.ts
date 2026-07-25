import prisma from "../config/prisma";


// Create Supplier
export const createSupplierService = async (data: any) => {

    return await prisma.supplier.create({
        data
    });

};


// Get All Suppliers
export const getAllSuppliersService = async () => {

    return await prisma.supplier.findMany({

        include: {
            products: true
        },

        orderBy: {
            createdAt: "desc"
        }

    });

};


// Get Supplier By ID
export const getSupplierByIdService = async (id: string) => {

    return await prisma.supplier.findUnique({

        where: {
            id
        },

        include: {
            products: true
        }

    });

};


// Update Supplier
export const updateSupplierService = async (
    id: string,
    data: any
) => {

    return await prisma.supplier.update({

        where: {
            id
        },

        data

    });

};


// Delete Supplier
export const deleteSupplierService = async (id: string) => {

    return await prisma.supplier.delete({

        where: {
            id
        }

    });

};