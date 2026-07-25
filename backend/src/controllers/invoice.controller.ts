import {Request,Response} from "express";


import {

createInvoiceService,

getAllInvoicesService,

deleteInvoiceService


}

from "../services/invoice.service";





export const createInvoiceController = async(

req:Request,

res:Response

)=>{


try{


const invoice =
await createInvoiceService(
req.body
);



res.status(201).json({

success:true,

invoice

});


}

catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}


};







export const getAllInvoicesController = async(

req:Request,

res:Response

)=>{


try{


const invoices =
await getAllInvoicesService();



res.json({

success:true,

invoices

});


}

catch(error:any){


res.status(400).json({

success:false,

message:error.message

});


}


};







export const deleteInvoiceController = async(

req:Request,

res:Response

)=>{


try{


const result =
await deleteInvoiceService(
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