import { Request, Response } from "express";
import { registerService, loginService } from "../services/auth.service";


// REGISTER CONTROLLER

export const registerUser = async (
    req: Request,
    res: Response
) => {

    try {

        const { name, email, password, role } = req.body;


        const user = await registerService(
            name,
            email,
            password,
            role
        );


        res.status(201).json({
            success: true,
            message: "User Registered Successfully 🎉",
            user
        });


    } catch(error:any){

        res.status(400).json({
            success:false,
            message:error.message
        });

    }

};




// LOGIN CONTROLLER

export const loginUser = async (
    req: Request,
    res: Response
) => {

    try {

        const { email, password } = req.body;


        const result = await loginService(
            email,
            password
        );


        res.status(200).json({
            success:true,
            message:"Login Successful",
            ...result
        });


    } catch(error:any){

        res.status(401).json({
            success:false,
            message:error.message
        });

    }

};