import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import API from "../api/axios";
import { toast } from "react-toastify";


function Accounts() {


const [invoices,setInvoices] = useState<any[]>([]);


const [summary,setSummary] = useState({

    totalInvoices: 0,

    paidInvoices: 0,

    pendingInvoices: 0,

    totalRevenue: 0

});





const loadData = async()=>{

try{


const invoiceResponse = 
await API.get("/invoices");



const accountResponse =
await API.get("/accounts");




setInvoices(
    invoiceResponse.data.invoices || []
);



setSummary(
    accountResponse.data.accounts || {

        totalInvoices:0,

        paidInvoices:0,

        pendingInvoices:0,

        totalRevenue:0
    }
);



}

catch(error:any){


toast.error(
"Failed loading accounts data"
);


console.log(error);


}


};






useEffect(()=>{

loadData();

},[]);









return (

<Layout>



<h1 className="
text-4xl
font-bold
mb-2
">

Accounts Management

</h1>



<p className="
text-gray-500
mb-8
">

Manage invoices, payments and financial records

</p>







{/* SUMMARY CARDS */}

<div className="
grid
grid-cols-1
md:grid-cols-4
gap-6
mb-8
">





<div className="
bg-white
rounded-2xl
shadow-lg
p-6
">

<p className="
text-gray-500
">

Total Invoices

</p>


<h2 className="
text-3xl
font-bold
mt-3
">

{summary.totalInvoices}

</h2>

</div>







<div className="
bg-white
rounded-2xl
shadow-lg
p-6
">

<p className="
text-gray-500
">

Total Revenue

</p>


<h2 className="
text-3xl
font-bold
text-green-600
mt-3
">

₹ {summary.totalRevenue}

</h2>

</div>







<div className="
bg-white
rounded-2xl
shadow-lg
p-6
">

<p className="
text-gray-500
">

Paid Invoices

</p>


<h2 className="
text-3xl
font-bold
text-blue-600
mt-3
">

{summary.paidInvoices}

</h2>

</div>







<div className="
bg-white
rounded-2xl
shadow-lg
p-6
">

<p className="
text-gray-500
">

Pending Invoices

</p>


<h2 className="
text-3xl
font-bold
text-red-600
mt-3
">

{summary.pendingInvoices}

</h2>

</div>





</div>










{/* INVOICE TABLE */}

<div className="
bg-white
rounded-2xl
shadow-lg
overflow-hidden
">



<table className="
w-full
">



<thead className="
bg-slate-900
text-white
">


<tr>


<th className="
p-5
text-left
">

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


</tr>


</thead>







<tbody>


{

invoices.length === 0 ?


<tr>

<td
colSpan={5}
className="
text-center
p-6
text-gray-500
">

No invoices found

</td>

</tr>



:


invoices.map((invoice)=>(


<tr

key={invoice.id}

className="
border-b
hover:bg-gray-50
">


<td className="
p-5
font-semibold
">

{invoice.invoiceNo}

</td>





<td>

{invoice.customer?.name}

</td>





<td>

₹ {invoice.total}

</td>





<td>


<span

className={`
px-3
py-1
rounded-full
text-sm
font-semibold

${
invoice.status === "PAID"

?

"bg-green-100 text-green-700"

:

"bg-red-100 text-red-700"

}

`}

>


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





</tr>


))


}



</tbody>



</table>



</div>







</Layout>

);


}


export default Accounts;