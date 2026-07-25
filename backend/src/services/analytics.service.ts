import prisma from "../config/prisma";


export const getAnalyticsService = async()=>{


const customers =
await prisma.customer.count();



const products =
await prisma.product.count();



const sales =
await prisma.sale.count();



const invoices =
await prisma.invoice.findMany();



const revenue =
invoices.reduce(
(sum,invoice)=>
sum + invoice.total,
0
);



const lowStock =
await prisma.product.findMany({

where:{
stock:{
lte:5
}
}

});



return {

customers,

products,

sales,

invoices:invoices.length,

revenue,

lowStock

};


};