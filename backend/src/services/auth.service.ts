import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";


// REGISTER SERVICE

export const registerService = async (
    name:string,
    email:string,
    password:string,
    role?: "ADMIN" | "SALES" | "WAREHOUSE" | "ACCOUNTS"
)=>{

    const existingUser = await prisma.user.findUnique({

        where:{
            email
        }

    });


    if(existingUser){

        throw new Error("Email already exists");

    }



    const hashedPassword = await bcrypt.hash(
        password,
        10
    );



    const user = await prisma.user.create({

        data:{

            name,

            email,

            password:hashedPassword,

            role:role || "SALES"

        }

    });



    return {

        id:user.id,

        name:user.name,

        email:user.email,

        role:user.role

    };

};





// LOGIN SERVICE

export const loginService = async(
    email:string,
    password:string
)=>{


    console.log("LOGIN EMAIL:",email);



    const user = await prisma.user.findUnique({

        where:{
            email
        }

    });



    if(!user){

        console.log("USER NOT FOUND");

        throw new Error(
            "User not found"
        );

    }



    console.log("USER FOUND:",user.email);



    console.log(
        "DATABASE PASSWORD:",
        user.password
    );



    const passwordMatch = await bcrypt.compare(

        password,

        user.password

    );



    console.log(
        "PASSWORD MATCH:",
        passwordMatch
    );



    if(!passwordMatch){

        throw new Error(
            "Invalid password"
        );

    }



    const token = jwt.sign(

        {
            id:user.id,
            role:user.role
        },

        process.env.JWT_SECRET!,

        {
            expiresIn:"1h"
        }

    );



    return {


        token,


        user:{

            id:user.id,

            name:user.name,

            email:user.email,

            role:user.role

        }


    };


};