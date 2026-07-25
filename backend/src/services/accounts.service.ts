import prisma from "../config/prisma";


export const getAccountsService = async()=>{


    const totalInvoices =
    await prisma.invoice.count();



    const paidInvoices =
    await prisma.invoice.count({

        where:{
            status:"PAID"
        }

    });



    const pendingInvoices =
    await prisma.invoice.count({

        where:{
            status:"PENDING"
        }

    });



    const revenue =
    await prisma.invoice.aggregate({

        _sum:{
            total:true
        },

        where:{
            status:"PAID"
        }

    });



    return {

        totalInvoices,

        paidInvoices,

        pendingInvoices,

        totalRevenue:
        revenue._sum.total || 0

    };


};