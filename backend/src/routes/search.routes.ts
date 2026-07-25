import { Router } from "express";
import prisma from "../config/prisma";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();


router.get("/", authMiddleware, async(req,res)=>{

try{

const keyword = String(req.query.q || "");


const products = await prisma.product.findMany({
    where:{
        name:{
            contains:keyword,
            mode:"insensitive"
        }
    }
});


const customers = await prisma.customer.findMany({
    where:{
        name:{
            contains:keyword,
            mode:"insensitive"
        }
    }
});


const invoices = await prisma.invoice.findMany({
    where:{
        invoiceNo:{
            contains:keyword,
            mode:"insensitive"
        }
    }
});


res.json({

success:true,

products,

customers,

invoices

});


}
catch(error:any){

res.status(500).json({

success:false,

message:error.message

});

}


});


export default router;