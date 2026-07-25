import bcrypt from "bcrypt";
import prisma from "./config/prisma";


async function resetPassword(){

    const hashedPassword = await bcrypt.hash(
        "123456",
        10
    );


    await prisma.user.update({

        where:{
            email:"nikitha@gmail.com"
        },

        data:{
            password:hashedPassword
        }

    });


    console.log("Password updated");

}


resetPassword();