import prisma from "../config/prisma";



// Create Customer
export const createCustomerService = async (
    name: string,
    email: string,
    phone: string,
    address: string
) => {


    const customer = await prisma.customer.create({

        data: {

            name,
            email,
            phone,
            address

        }

    });


    return customer;

};





// Get All Customers
export const getAllCustomersService = async () => {


    return await prisma.customer.findMany({

        orderBy: {

            createdAt: "desc"

        }

    });


};







// Get Customer By ID
export const getCustomerByIdService = async (
    id:string
)=>{


    const customer =
    await prisma.customer.findUnique({

        where:{
            id
        }

    });



    if(!customer){

        throw new Error(
            "Customer not found"
        );

    }


    return customer;


};








// Update Customer
export const updateCustomerService = async (

    id:string,

    data:any

)=>{


    const customer =
    await prisma.customer.findUnique({

        where:{
            id
        }

    });



    if(!customer){

        throw new Error(
            "Customer not found"
        );

    }



    const updatedCustomer =
    await prisma.customer.update({

        where:{

            id

        },


        data:{


            name:data.name,

            email:data.email,

            phone:data.phone,

            address:data.address


        }


    });



    return updatedCustomer;


};









// Delete Customer
export const deleteCustomerService = async (

    id:string

)=>{


    const customer =
    await prisma.customer.findUnique({

        where:{
            id
        }

    });



    if(!customer){

        throw new Error(
            "Customer not found"
        );

    }



    await prisma.customer.delete({

        where:{

            id

        }

    });



    return {


        message:
        "Customer deleted successfully"


    };


};
