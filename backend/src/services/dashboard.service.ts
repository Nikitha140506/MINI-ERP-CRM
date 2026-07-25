import prisma from "../config/prisma";


export const getDashboardService = async()=>{


const totalUsers =
await prisma.user.count();



const totalCustomers =
await prisma.customer.count();



const totalProducts =
await prisma.product.count();



const totalSales =
await prisma.sale.count();




const totalInvoices =
await prisma.invoice.count();





const revenue =
await prisma.invoice.aggregate({

    _sum:{
        total:true
    }

});





const paidInvoices =
await prisma.invoice.count({

where:{

status:"PAID"

}

});







return {


totalUsers,

totalCustomers,

totalProducts,

totalSales,


totalInvoices,


paidInvoices,


totalRevenue:
revenue._sum.total || 0


};



};