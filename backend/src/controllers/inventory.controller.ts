import { Request, Response } from "express";
import {
    getInventoryService,
    addStockService,
    removeStockService,
    lowStockService
} from "../services/inventory.service";

export const getInventory = async (
    req: Request,
    res: Response
) => {

    try {

        const products = await getInventoryService();

        res.status(200).json({
            success: true,
            products
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

export const addStock = async (
    req: Request,
    res: Response
) => {

    try {

        const { quantity } = req.body;

        const product = await addStockService(
            req.params.id,
            Number(quantity)
        );

        res.status(200).json({
            success: true,
            product
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const removeStock = async (
    req: Request,
    res: Response
) => {

    try {

        const { quantity } = req.body;

        const product = await removeStockService(
            req.params.id,
            Number(quantity)
        );

        res.status(200).json({
            success: true,
            product
        });

    } catch (error: any) {

        res.status(400).json({
            success: false,
            message: error.message
        });

    }

};

export const lowStock = async (
    req: Request,
    res: Response
) => {

    try {

        const products = await lowStockService();

        res.status(200).json({
            success: true,
            products
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};