import prisma from "../config/prisma";


// Create Purchase
export const createPurchaseService = async(
    supplierId:string,
    productId:string,
    quantity:number,
    purchasePrice:number
)=>{


    const supplier = await prisma.supplier.findUnique({
        where:{
            id:supplierId
        }
    });


    if(!supplier){
        throw new Error("Supplier not found");
    }



    const product = await prisma.product.findUnique({
        where:{
            id:productId
        }
    });



    if(!product){
        throw new Error("Product not found");
    }



    const totalAmount = quantity * purchasePrice;



    const purchase = await prisma.purchase.create({

        data:{

            supplierId,

            productId,

            quantity,

            purchasePrice,

            totalAmount

        },

        include:{

            supplier:true,

            product:true

        }

    });



    // Increase Stock

    await prisma.product.update({

        where:{
            id:productId
        },

        data:{

            stock:
            product.stock + quantity

        }

    });



    return purchase;

};






// Get All Purchases

export const getAllPurchasesService = async()=>{


    return await prisma.purchase.findMany({

        include:{

            supplier:true,

            product:true

        },


        orderBy:{
            createdAt:"desc"
        }

    });


};







// Get Purchase By ID

export const getPurchaseByIdService = async(
    id:string
)=>{


    const purchase =
    await prisma.purchase.findUnique({

        where:{
            id
        },

        include:{

            supplier:true,

            product:true

        }

    });



    if(!purchase){

        throw new Error(
            "Purchase not found"
        );

    }


    return purchase;

};








// Delete Purchase

export const deletePurchaseService = async(
    id:string
)=>{


    const purchase =
    await prisma.purchase.findUnique({

        where:{
            id
        }

    });



    if(!purchase){

        throw new Error(
            "Purchase not found"
        );

    }



    await prisma.purchase.delete({

        where:{
            id
        }

    });



    return {

        message:
        "Purchase deleted successfully"

    };


};