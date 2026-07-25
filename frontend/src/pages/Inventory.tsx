import { useEffect, useState } from "react";
import API from "../api/axios";

import { toast } from "react-toastify";
import {
    FaPlus,
    FaMinus,
    FaBoxes,
    FaSearch
} from "react-icons/fa";

import Navbar from "../components/Navbar";


function Inventory() {


    const [products, setProducts] = useState<any[]>([]);
    const [search, setSearch] = useState("");



    const loadInventory = async () => {

        try {

            const res = await API.get("/inventory");

            setProducts(res.data.products || []);

        } catch (error: any) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load inventory"
            );

        }

    };



    useEffect(() => {

        loadInventory();

    }, []);




    const updateStock = async (
        id: string,
        type: "add" | "remove"
    ) => {


        const qty = prompt("Enter quantity");


        if (!qty) return;



        try {


            await API.put(
                `/inventory/${type}/${id}`,
                {
                    quantity: Number(qty)
                }
            );


            toast.success("Stock Updated");


            loadInventory();



        } catch (error: any) {


            toast.error(
                error.response?.data?.message ||
                "Update Failed"
            );


        }


    };




    const filteredProducts = products.filter((p) =>
        p.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );




    return (

        <>


            <Navbar />


            <div className="ml-64 p-8 bg-gray-50 min-h-screen">



                <div className="
                flex
                justify-between
                items-center
                mb-8
                ">


                    <h1 className="
                    text-4xl
                    font-bold
                    flex
                    items-center
                    gap-3
                    ">

                        <FaBoxes />

                        Inventory

                    </h1>



                    <button

                        onClick={loadInventory}

                        className="
                        bg-blue-600
                        text-white
                        px-5
                        py-2
                        rounded-lg
                        hover:bg-blue-700
                        "

                    >

                        Refresh

                    </button>


                </div>





                <div className="relative mb-6">


                    <FaSearch

                        className="
                        absolute
                        left-4
                        top-4
                        text-gray-400
                        "

                    />



                    <input

                        type="text"

                        placeholder="Search Product..."

                        value={search}

                        onChange={(e)=>
                            setSearch(e.target.value)
                        }

                        className="
                        w-full
                        border
                        rounded-xl
                        pl-12
                        py-3
                        "

                    />


                </div>






                <div className="
                bg-white
                rounded-xl
                shadow
                overflow-hidden
                ">


                    <table className="w-full">


                        <thead className="
                        bg-slate-900
                        text-white
                        ">


                            <tr>


                                <th className="p-4 text-left">
                                    Product
                                </th>


                                <th className="p-4">
                                    Category
                                </th>


                                <th className="p-4">
                                    Price
                                </th>


                                <th className="p-4">
                                    Stock
                                </th>


                                <th className="p-4">
                                    Status
                                </th>


                                <th className="p-4">
                                    Actions
                                </th>


                            </tr>


                        </thead>





                        <tbody>



                        {
                            filteredProducts.map((product)=>(


                                <tr

                                key={product.id}

                                className="border-b"


                                >



                                    <td className="p-4">

                                        {product.name}

                                    </td>



                                    <td className="text-center">

                                        {product.category}

                                    </td>




                                    <td className="text-center">

                                        ₹{product.price}

                                    </td>




                                    <td className="
                                    text-center
                                    font-bold
                                    ">

                                        {product.stock}

                                    </td>





                                    <td className="text-center">


                                    {

                                    product.stock <= 5 ?


                                    <span className="
                                    bg-red-100
                                    text-red-700
                                    px-3
                                    py-1
                                    rounded-full
                                    ">

                                        Low Stock

                                    </span>


                                    :


                                    <span className="
                                    bg-green-100
                                    text-green-700
                                    px-3
                                    py-1
                                    rounded-full
                                    ">

                                        In Stock

                                    </span>


                                    }


                                    </td>






                                    <td>


                                        <div className="
                                        flex
                                        justify-center
                                        gap-3
                                        ">


                                            <button

                                            onClick={()=>
                                                updateStock(
                                                    product.id,
                                                    "add"
                                                )
                                            }


                                            className="
                                            bg-green-600
                                            text-white
                                            p-2
                                            rounded
                                            ">

                                                <FaPlus />

                                            </button>





                                            <button


                                            onClick={()=>
                                                updateStock(
                                                    product.id,
                                                    "remove"
                                                )
                                            }


                                            className="
                                            bg-red-600
                                            text-white
                                            p-2
                                            rounded
                                            ">


                                                <FaMinus />


                                            </button>


                                        </div>


                                    </td>



                                </tr>


                            ))
                        }



                        </tbody>



                    </table>



                </div>



            </div>



        </>


    );


}



export default Inventory;