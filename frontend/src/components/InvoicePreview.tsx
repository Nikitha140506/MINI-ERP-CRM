import {
    FaPrint
} from "react-icons/fa";


interface Props{

    invoice:any;

}



function InvoicePreview({invoice}:Props){


const printInvoice = ()=>{

    window.print();

};




return(


<div className="
bg-white
shadow-xl
rounded-3xl
p-10
max-w-4xl
mx-auto
">



{/* Header */}

<div className="
flex
justify-between
border-b
pb-6
">


<div>

<h1 className="
text-3xl
font-bold
text-slate-800
">

MINI ERP CRM

</h1>


<p className="
text-gray-500
">

Business Invoice

</p>


</div>




<div className="text-right">


<h2 className="
text-xl
font-bold
">

Invoice

</h2>


<p>

#{invoice.invoiceNo}

</p>


<p>

{
new Date(
invoice.createdAt
)
.toLocaleDateString()

}

</p>


</div>



</div>







{/* Customer */}

<div className="
mt-8
">


<h3 className="
font-bold
text-lg
">

Bill To

</h3>


<p>

{invoice.customer?.name}

</p>


<p>

{invoice.customer?.email}

</p>


<p>

{invoice.customer?.phone}

</p>


</div>








{/* Products */}



<table className="
w-full
mt-8
">


<thead className="
bg-slate-900
text-white
">


<tr>

<th className="p-3 text-left">
Product
</th>


<th>
Quantity
</th>


<th>
Price
</th>


<th>
Total
</th>


</tr>


</thead>





<tbody>


{

invoice.items?.map((item:any)=>(


<tr

key={item.id}

className="
border-b
"


>


<td className="p-3">

{item.product?.name}

</td>


<td>

{item.quantity}

</td>



<td>

₹{item.price}

</td>


<td>

₹{item.total}

</td>


</tr>


))


}


</tbody>



</table>







{/* Summary */}



<div className="
mt-8
flex
justify-end
">


<div className="
space-y-3
text-right
">


<p>

Subtotal:
₹{invoice.subtotal}

</p>


<p>

GST:
₹{invoice.tax}

</p>


<h2 className="
text-2xl
font-bold
">

Total:
₹{invoice.total}

</h2>


</div>


</div>







<button

onClick={printInvoice}

className="
mt-8
bg-slate-900
text-white
px-6
py-3
rounded-xl
flex
gap-2
items-center
"


>

<FaPrint/>

Print Invoice

</button>




</div>


);


}


export default InvoicePreview;