import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {

        const authHeader = req.headers.authorization;


        if (!authHeader) {

            return res.status(401).json({
                success:false,
                message:"Token missing"
            });

        }


        const parts = authHeader.split(" ");


        if (
            parts.length !== 2 ||
            parts[0] !== "Bearer"
        ) {

            return res.status(401).json({
                success:false,
                message:"Invalid authorization format"
            });

        }


        const token = parts[1];


        const secret = process.env.JWT_SECRET;


        if(!secret){

            return res.status(500).json({
                success:false,
                message:"JWT secret missing"
            });

        }



        const decoded = jwt.verify(
            token,
            secret
        );


        (req as any).user = decoded;


        next();


    }
    catch(error:any){


        return res.status(401).json({

            success:false,

            message:"Invalid or expired token"

        });


    }

};


export default authMiddleware;