import { Request, Response } from "express";

import {

    createPurchaseService,
    getAllPurchasesService,
    getPurchaseByIdService,
    deletePurchaseService

} from "../services/purchase.service";




// =========================
// Create Purchase
// =========================

export const createPurchaseController = async(
    req:Request,
    res:Response
)=>{

console.log("REQUEST BODY:", req.body);
    try{


        const {

            supplierId,
            productId,
            quantity,
            purchasePrice

        } = req.body;



        const purchase =
        await createPurchaseService(

            supplierId,

            productId,

            Number(quantity),

            Number(purchasePrice)

        );




        res.status(201).json({

            success:true,

            message:
            "Purchase created successfully",

            purchase

        });



    }

    catch(error:any){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }


};









// =========================
// Get All Purchases
// =========================

export const getAllPurchasesController = async(
    req:Request,
    res:Response
)=>{


    try{


        const purchases =
        await getAllPurchasesService();




        res.json({

            success:true,

            purchases

        });



    }

    catch(error:any){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }


};









// =========================
// Get Purchase By ID
// =========================

export const getPurchaseByIdController = async(
    req:Request,
    res:Response
)=>{


    try{


        const purchase =
        await getPurchaseByIdService(

            req.params.id

        );




        res.json({

            success:true,

            purchase

        });



    }

    catch(error:any){


        res.status(404).json({

            success:false,

            message:error.message

        });


    }


};









// =========================
// Delete Purchase
// =========================

export const deletePurchaseController = async(
    req:Request,
    res:Response
)=>{


    try{


        const result =
        await deletePurchaseService(

            req.params.id

        );




        res.json({

            success:true,

            ...result

        });



    }

    catch(error:any){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }


};