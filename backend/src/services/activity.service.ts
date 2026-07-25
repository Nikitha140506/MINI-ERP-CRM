import prisma from "../config/prisma";


export const getActivitiesService = async()=>{

    return await prisma.activityLog.findMany({

        include:{
            user:true
        },

        orderBy:{
            createdAt:"desc"
        }

    });

};