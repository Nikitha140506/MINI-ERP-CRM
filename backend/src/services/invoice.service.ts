import prisma from "../config/prisma";


export const createInvoiceService = async(data:any)=>{


const invoiceCount =
await prisma.invoice.count();



const invoiceNo =
`INV-${Date.now()}-${invoiceCount+1}`;



let subtotal = 0;



data.items.forEach((item:any)=>{

subtotal += item.price * item.quantity;

});



const tax =
subtotal * 0.18;



const total =
subtotal + tax;





const invoice =
await prisma.invoice.create({

data:{


invoiceNo,


customerId:data.customerId,


subtotal,


tax,


total,


status:"PAID",



items:{


create:

data.items.map((item:any)=>(

{

productId:item.productId,

quantity:item.quantity,

price:item.price,

total:
item.price * item.quantity

}

))


}


},



include:{


customer:true,


items:{

include:{

product:true

}

}


}


});



return invoice;


};







export const getAllInvoicesService = async()=>{


return await prisma.invoice.findMany({

include:{


customer:true,


items:{

include:{

product:true

}

}


},


orderBy:{

createdAt:"desc"

}


});


};







export const deleteInvoiceService = async(id:string)=>{


await prisma.invoice.delete({

where:{
id
}

});


return{

message:"Invoice deleted successfully"

};


};