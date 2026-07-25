import { useEffect, useState } from "react";
import API from "../api/axios";


function InvoiceForm(){

    const [customers,setCustomers] = useState<any[]>([]);
    const [products,setProducts] = useState<any[]>([]);


    const [customerId,setCustomerId] = useState("");

    const [productId,setProductId] = useState("");

    const [quantity,setQuantity] = useState(1);



    const [price,setPrice] = useState(0);



    useEffect(()=>{

        loadData();

    },[]);



    const loadData = async()=>{

        try{

            const customerRes =
            await API.get("/customers");


            const productRes =
            await API.get("/products");


            setCustomers(
                customerRes.data.customers
            );


            setProducts(
                productRes.data.products
            );


        }
        catch(error){

            console.log(error);

        }

    };





    const selectedProduct =
    products.find(
        p=>p.id===productId
    );





    useEffect(()=>{

        if(selectedProduct){

            setPrice(
                selectedProduct.price
            );

        }

    },[productId]);





    const subtotal =
    price * quantity;


    const tax =
    subtotal * 0.18;


    const total =
    subtotal + tax;





    const createInvoice = async()=>{


        try{


            const invoiceData={

                customerId,

                items:[

                    {

                        productId,

                        quantity,

                        price,

                        total:subtotal

                    }

                ],

                subtotal,

                tax,

                total

            };



            const res =
            await API.post(
                "/invoices",
                invoiceData
            );


            alert(
                "Invoice Created Successfully"
            );


            console.log(res.data);



        }
        catch(error){

            console.log(error);

            alert(
                "Invoice creation failed"
            );

        }


    };







    return(


        <div className="
        bg-white
        shadow-xl
        rounded-3xl
        p-8
        space-y-6
        ">



        <h2 className="
        text-2xl
        font-bold
        text-slate-800
        ">

        Create New Invoice

        </h2>





        <div>


        <label>
        Select Customer
        </label>


        <select

        className="
        w-full
        border
        p-3
        rounded-xl
        mt-2
        "

        value={customerId}

        onChange={
            e=>setCustomerId(e.target.value)
        }

        >


        <option>
        Select Customer
        </option>


        {
        customers.map(c=>(

            <option
            key={c.id}
            value={c.id}
            >

            {c.name}

            </option>

        ))
        }


        </select>


        </div>








        <div>


        <label>
        Select Product
        </label>


        <select

        className="
        w-full
        border
        p-3
        rounded-xl
        mt-2
        "

        value={productId}

        onChange={
            e=>setProductId(e.target.value)
        }

        >


        <option>
        Select Product
        </option>


        {
        products.map(p=>(

            <option

            key={p.id}

            value={p.id}

            >

            {p.name}

            </option>

        ))
        }


        </select>


        </div>






        <div>


        <label>
        Quantity
        </label>


        <input

type="number"

min="1"

className="
w-full
border
p-3
rounded-xl
mt-2
"

value={quantity}

onChange={

e=>{

const value = Number(e.target.value);

if(value >= 1){

setQuantity(value);

}

}

}

/>


        </div>







        <div className="
        bg-slate-100
        rounded-xl
        p-5
        ">


        <p>
        Subtotal:
        ₹{subtotal}
        </p>


        <p>
        GST (18%):
        ₹{tax.toFixed(2)}
        </p>


        <h3 className="
        text-xl
        font-bold
        ">

        Total:
        ₹{total.toFixed(2)}

        </h3>


        </div>






        <button

        onClick={createInvoice}

        className="
        bg-slate-900
        text-white
        px-6
        py-3
        rounded-xl
        hover:bg-slate-700
        "

        >

        Generate Invoice

        </button>





        </div>


    );


}


export default InvoiceForm;