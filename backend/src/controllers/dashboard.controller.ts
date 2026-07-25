import { Request, Response } from "express";

import {
    getDashboardService
} from "../services/dashboard.service";


export const getDashboard = async (
    req: Request,
    res: Response
) => {

    try {

        const dashboard = await getDashboardService();


        res.status(200).json({
            success: true,
            dashboard
        });


    } catch(error:any){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }

};