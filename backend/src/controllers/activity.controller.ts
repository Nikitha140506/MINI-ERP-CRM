import {Request,Response} from "express";

import {
    getActivitiesService
}
from "../services/activity.service";


export const getActivities = async(
req:Request,
res:Response
)=>{

try{

const activities =
await getActivitiesService();


res.json({

success:true,

activities

});


}
catch(error:any){

res.status(500).json({

success:false,

message:error.message

});

}


};