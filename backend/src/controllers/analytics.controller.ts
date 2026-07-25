import {Request,Response} from "express";

import {
getAnalyticsService
}
from "../services/analytics.service";



export const getAnalytics = async(
req:Request,
res:Response
)=>{


try{


const data =
await getAnalyticsService();


res.json({

success:true,

data

});


}


catch(error:any){


res.status(500).json({

success:false,

message:error.message

});


}


};
