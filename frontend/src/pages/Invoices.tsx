import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import InvoiceForm from "../components/InvoiceForm";
import API from "../api/axios";
import { downloadInvoice } from "../utils/invoicePdf";
import {
    FaTrash,
    FaPrint,
    FaFileInvoice
} from "react-icons/fa";



function Invoices(){


const [invoices,setInvoices] =
useState<any[]>([]);





const loadInvoices = async()=>{


try{


const res =
await API.get("/invoices");


setInvoices(
res.data.invoices
);


}
catch(error){

console.log(error);

}


};





useEffect(()=>{

loadInvoices();

},[]);







const deleteInvoice = async(id:string)=>{


try{


await API.delete(
`/invoices/${id}`
);


loadInvoices();


}
catch(error){

console.log(error);

}


};






const printInvoice=()=>{

window.print();

};







return(


<Layout>


<div className="space-y-8">



{/* Header */}


<div className="
flex
justify-between
items-center
">


<div>

<h1 className="
text-4xl
font-bold
text-slate-800
">

Invoice Management

</h1>


<p className="
text-gray-500
mt-2
">

Create and manage business invoices

</p>


</div>



<div className="
bg-slate-900
text-white
px-5
py-3
rounded-xl
flex
gap-2
items-center
">

<FaFileInvoice/>

{invoices.length} Invoices

</div>


</div>






{/* Create Invoice */}


<InvoiceForm />








{/* Invoice Table */}



<div className="
bg-white
rounded-3xl
shadow-lg
p-8
">


<h2 className="
text-2xl
font-bold
mb-6
">

Recent Invoices

</h2>




<div className="
overflow-x-auto
">


<table className="w-full">



<thead className="
bg-slate-900
text-white
">


<tr>


<th className="p-4 text-left">
Invoice No
</th>


<th>
Customer
</th>


<th>
Amount
</th>


<th>
Status
</th>


<th>
Date
</th>


<th>
Actions
</th>


</tr>


</thead>







<tbody>


{

invoices.map((invoice)=>(


<tr

key={invoice.id}

className="
border-b
hover:bg-gray-50
"


>



<td className="p-4 font-semibold">

{invoice.invoiceNo}

</td>




<td>

{invoice.customer?.name}

</td>





<td className="
font-bold
">

₹{invoice.total}

</td>





<td>


<span className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
">

{invoice.status}

</span>


</td>





<td>

{

new Date(
invoice.createdAt
)
.toLocaleDateString()

}

</td>






<td className="
flex
gap-3
p-3
">


<button

onClick={printInvoice}

className="
bg-blue-600
text-white
p-3
rounded-xl
">

<FaPrint/>

</button>

<button
  onClick={() => downloadInvoice(invoice)}
  className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
>
  Download PDF
</button>


<button

onClick={()=>
deleteInvoice(invoice.id)
}

className="
bg-red-600
text-white
p-3
rounded-xl
">

<FaTrash/>

</button>



</td>





</tr>


))


}



</tbody>



</table>


</div>


</div>





</div>


</Layout>


);


}


export default Invoices;