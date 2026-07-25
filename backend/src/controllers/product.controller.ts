import {Request,Response} from "express";


import {

createProductService,

getAllProductsService,

getProductByIdService,

updateProductService,

deleteProductService


}
from "../services/product.service";







// Create

export const createProductController = async(

req:Request,

res:Response

)=>{


try{


const product =
await createProductService(
req.body
);



res.status(201).json({

success:true,

product

});


}

catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}


};









// Get All

export const getAllProductsController = async(

req:Request,

res:Response

)=>{


try{


const products =
await getAllProductsService();



res.json({

success:true,

products

});


}

catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}


};









// Get By ID

export const getProductByIdController = async(

req:Request,

res:Response

)=>{


try{


const product =
await getProductByIdService(

req.params.id

);



res.json({

success:true,

product

});


}

catch(error:any){


res.status(404).json({

success:false,

message:error.message

});


}


};









// Update Product

export const updateProductController = async(

req:Request,

res:Response

)=>{


try{


const product =
await updateProductService(

req.params.id,

req.body

);



res.json({

success:true,

message:
"Product updated successfully",

product

});


}

catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}


};









// Delete Product

export const deleteProductController = async(

req:Request,

res:Response

)=>{


try{


const result =
await deleteProductService(

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