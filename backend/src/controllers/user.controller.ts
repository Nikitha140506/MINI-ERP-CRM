import { Request, Response } from "express";
import prisma from "../config/prisma";
import bcrypt from "bcrypt";


// GET PROFILE

export const getProfile = async(req:any,res:Response)=>{

    try{

        const user = await prisma.user.findUnique({

            where:{
                id:req.user.id
            },

            select:{
                id:true,
                name:true,
                email:true,
                role:true,
                createdAt:true
            }

        });


        res.json({

            success:true,
            user

        });


    }
    catch(error){

        res.status(500).json({

            success:false,
            message:"Failed to fetch profile"

        });

    }

};




// UPDATE PROFILE

export const updateProfile = async(req:any,res:Response)=>{

    try{

        const {
            name,
            email
        } = req.body;


        const user = await prisma.user.update({

            where:{
                id:req.user.id
            },

            data:{
                name,
                email
            }

        });


        res.json({

            success:true,
            message:"Profile updated successfully",
            user

        });


    }
    catch(error){

        res.status(500).json({

            success:false,
            message:"Profile update failed"

        });

    }

};




// CHANGE PASSWORD

export const changePassword = async(req:any,res:Response)=>{

    try{

        const {
            oldPassword,
            newPassword
        } = req.body;



        const user = await prisma.user.findUnique({

            where:{
                id:req.user.id
            }

        });



        if(!user){

            return res.status(404).json({
                message:"User not found"
            });

        }



        const matched = await bcrypt.compare(

            oldPassword,

            user.password

        );



        if(!matched){

            return res.status(400).json({

                message:"Old password incorrect"

            });

        }



        const hashedPassword = await bcrypt.hash(

            newPassword,

            10

        );



        await prisma.user.update({

            where:{
                id:req.user.id
            },

            data:{
                password:hashedPassword
            }

        });



        res.json({

            success:true,

            message:"Password changed successfully"

        });


    }
    catch(error){

        res.status(500).json({

            success:false,

            message:"Password change failed"

        });

    }

};