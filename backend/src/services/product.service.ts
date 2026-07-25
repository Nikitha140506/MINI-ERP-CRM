import prisma from "../config/prisma";



// =========================
// Create Product
// =========================

export const createProductService = async(
    data:any
)=>{


    return await prisma.product.create({

        data:{

            name:data.name,

            description:data.description || null,

            price:Number(data.price),

            stock:Number(data.stock),

            category:data.category,

            sku:data.sku || null,

            supplierId:data.supplierId || null

        }

    });


};




// =========================
// Get All Products
// =========================

export const getAllProductsService = async()=>{


    return await prisma.product.findMany({

        include:{
            supplier:true
        },

        orderBy:{

            createdAt:"desc"

        }

    });


};




// =========================
// Get Product By ID
// =========================

export const getProductByIdService = async(
    id:string
)=>{


    const product =
    await prisma.product.findUnique({

        where:{

            id

        },

        include:{
            supplier:true
        }

    });



    if(!product){

        throw new Error(
            "Product not found"
        );

    }


    return product;


};




// =========================
// Update Product
// =========================

export const updateProductService = async(

    id:string,

    data:any

)=>{


    const product =
    await prisma.product.findUnique({

        where:{

            id

        }

    });



    if(!product){

        throw new Error(
            "Product not found"
        );

    }



    return await prisma.product.update({

        where:{

            id

        },


        data:{


            name:data.name,

            description:data.description || null,

            price:Number(data.price),

            stock:Number(data.stock),

            category:data.category,

            sku:data.sku || null,

            supplierId:data.supplierId || null


        }


    });


};




// =========================
// Delete Product
// =========================

export const deleteProductService = async(

    id:string

)=>{


    const product =
    await prisma.product.findUnique({

        where:{

            id

        }

    });



    if(!product){

        throw new Error(
            "Product not found"
        );

    }




    await prisma.product.delete({

        where:{

            id

        }

    });



    return {


        message:
        "Product deleted successfully"


    };


};