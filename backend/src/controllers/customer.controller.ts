import { Request, Response } from "express";

import {
    createCustomerService,
    getAllCustomersService,
    getCustomerByIdService,
    updateCustomerService,
    deleteCustomerService
} from "../services/customer.service";





// Create Customer
export const createCustomerController = async(
    req:Request,
    res:Response
)=>{


    try{


        const {
            name,
            email,
            phone,
            address
        } = req.body;



        const customer =
        await createCustomerService(
            name,
            email,
            phone,
            address
        );



        res.status(201).json({

            success:true,

            customer

        });



    }

    catch(error:any){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }


};








// Get All Customers
export const getAllCustomersController = async(
    req:Request,
    res:Response
)=>{


    try{


        const customers =
        await getAllCustomersService();



        res.json({

            success:true,

            customers

        });



    }

    catch(error:any){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }


};








// Get Customer By ID
export const getCustomerByIdController = async(
    req:Request,
    res:Response
)=>{


    try{


        const customer =
        await getCustomerByIdService(

            req.params.id as string

        );



        res.json({

            success:true,

            customer

        });



    }

    catch(error:any){


        res.status(404).json({

            success:false,

            message:error.message

        });


    }


};









// Update Customer
export const updateCustomerController = async(
    req:Request,
    res:Response
)=>{


    try{


        const customer =
        await updateCustomerService(

            req.params.id as string,

            req.body

        );



        res.json({

            success:true,

            message:"Customer updated successfully",

            customer

        });



    }

    catch(error:any){


        res.status(400).json({

            success:false,

            message:error.message

        });


    }


};









// Delete Customer
export const deleteCustomerController = async(
    req:Request,
    res:Response
)=>{


    try{


        const result =
        await deleteCustomerService(

            req.params.id as string

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