import { Request, Response } from "express";

import {
  createSaleService,
  getAllSalesService,
  getSaleByIdService,
  deleteSaleService,
} from "../services/sale.service";


// CREATE SALE
export const createSale = async (
  req: Request,
  res: Response
) => {

  try {

    const {
      customerId,
      productId,
      quantity
    } = req.body;


    const sale = await createSaleService(
      customerId,
      productId,
      Number(quantity)
    );


    res.status(201).json({
      success: true,
      message: "Sale created successfully",
      sale
    });


  } catch(error:any){

    res.status(400).json({
      success:false,
      message:error.message
    });

  }
};



// GET ALL SALES
export const getAllSales = async (
  req: Request,
  res: Response
)=>{

  try{

    const sales = await getAllSalesService();


    res.status(200).json({
      success:true,
      sales
    });


  }catch(error:any){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }

};



// GET SALE BY ID
export const getSaleById = async (
  req: Request,
  res: Response
)=>{

  try{

    const sale = await getSaleByIdService(
      req.params.id as string
    );


    res.status(200).json({
      success:true,
      sale
    });


  }catch(error:any){

    res.status(404).json({
      success:false,
      message:error.message
    });

  }

};



// DELETE SALE
export const deleteSale = async (
  req: Request,
  res: Response
)=>{

  try{

    const result = await deleteSaleService(
      req.params.id as string
    );


    res.status(200).json({
      success:true,
      message:result.message
    });


  }catch(error:any){

    res.status(404).json({
      success:false,
      message:error.message
    });

  }

};