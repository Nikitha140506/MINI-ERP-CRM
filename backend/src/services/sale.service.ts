import prisma from "../config/prisma";


// ============================
// Create Sale
// ============================

export const createSaleService = async (

  customerId:string,

  productId:string,

  quantity:number

)=>{


  const customer = await prisma.customer.findUnique({

    where:{
      id:customerId
    }

  });



  if(!customer){

    throw new Error(
      "Customer not found"
    );

  }




  const product = await prisma.product.findUnique({

    where:{
      id:productId
    }

  });



  if(!product){

    throw new Error(
      "Product not found"
    );

  }





  if(product.stock < quantity){

    throw new Error(
      "Insufficient stock"
    );

  }





  const totalPrice =
  product.price * quantity;






  const sale = await prisma.sale.create({

    data:{

      customerId,

      productId,

      quantity,

      totalPrice

    },


    include:{

      customer:true,

      product:true

    }


  });






  // Reduce product stock automatically

  await prisma.product.update({

    where:{

      id:productId

    },


    data:{

      stock:{

        decrement:quantity

      }

    }


  });





  return sale;


};








// ============================
// Get All Sales
// ============================

export const getAllSalesService = async()=>{


return await prisma.sale.findMany({

include:{


customer:true,

product:true


},


orderBy:{


createdAt:"desc"


}


});


};









// ============================
// Get Sale By ID
// ============================

export const getSaleByIdService = async(

id:string

)=>{


const sale = await prisma.sale.findUnique({

where:{

id

},


include:{


customer:true,

product:true


}


});




if(!sale){

throw new Error(
"Sale not found"
);

}




return sale;


};









// ============================
// Delete Sale
// ============================

export const deleteSaleService = async(

id:string

)=>{



const sale = await prisma.sale.findUnique({

where:{

id

}

});





if(!sale){

throw new Error(
"Sale not found"
);

}







// Restore stock when sale is deleted

await prisma.product.update({

where:{

id:sale.productId

},


data:{


stock:{

increment:sale.quantity

}


}


});







await prisma.sale.delete({

where:{

id

}

});





return{


message:
"Sale deleted successfully"


};


};