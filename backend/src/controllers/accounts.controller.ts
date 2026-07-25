import {Request,Response} from "express";

import {
    getAccountsService
}
from "../services/accounts.service";



export const getAccounts = async(
req:Request,
res:Response
)=>{


try{


const accounts =
await getAccountsService();



res.status(200).json({

success:true,

accounts

});


}
catch(error:any){


res.status(500).json({

success:false,

message:error.message

});


}


};