import { Request, Response } from "express";

import {
  createSupplierService,
  getAllSuppliersService,
  getSupplierByIdService,
  updateSupplierService,
  deleteSupplierService,
} from "../services/supplier.service";



// Create Supplier
export const createSupplierController = async (
  req: Request,
  res: Response
) => {
  try {

    const supplier = await createSupplierService(req.body);

    res.status(201).json({
      success: true,
      supplier,
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};



// Get All Suppliers
export const getAllSuppliersController = async (
  req: Request,
  res: Response
) => {
  try {

    const suppliers = await getAllSuppliersService();

    res.json({
      success: true,
      suppliers,
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};



// Get Supplier By ID
export const getSupplierByIdController = async (
  req: Request,
  res: Response
) => {
  try {

    const supplier = await getSupplierByIdService(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }

    res.json({
      success: true,
      supplier,
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};



// Update Supplier
export const updateSupplierController = async (
  req: Request,
  res: Response
) => {
  try {

    const supplier = await updateSupplierService(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      message: "Supplier updated successfully",
      supplier,
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};



// Delete Supplier
export const deleteSupplierController = async (
  req: Request,
  res: Response
) => {
  try {

    await deleteSupplierService(req.params.id);

    res.json({
      success: true,
      message: "Supplier deleted successfully",
    });

  } catch (error: any) {

    res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export default {
  createSupplierController,
  getAllSuppliersController,
  getSupplierByIdController,
  updateSupplierController,
  deleteSupplierController,
};