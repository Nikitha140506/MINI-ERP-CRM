import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import Layout from "../layouts/Layout";


function Sales(){


const [customers,setCustomers]=useState<any[]>([]);

const [products,setProducts]=useState<any[]>([]);

const [sales,setSales]=useState<any[]>([]);



const [form,setForm]=useState({

customerId:"",
productId:"",
quantity:""

});



const [total,setTotal]=useState(0);







const loadData=async()=>{


try{


const customerRes =
await API.get("/customers");


const productRes =
await API.get("/products");


const salesRes =
await API.get("/sales");



setCustomers(
customerRes.data.customers
);


setProducts(
productRes.data.products
);


setSales(
salesRes.data.sales
);



}

catch(error){

toast.error(
"Failed loading sales"
);

}


};







useEffect(()=>{


loadData();


},[]);








useEffect(()=>{


const product =
products.find(
p=>p.id===form.productId
);


if(product){

setTotal(
product.price *
Number(form.quantity || 0)
);


}

else{


setTotal(0);


}



},[form.productId,form.quantity,products]);









const createSale=async(e:any)=>{


e.preventDefault();



try{


await API.post(

"/sales",

{

customerId:form.customerId,

productId:form.productId,

quantity:Number(form.quantity)

}

);



toast.success(
"Sale Created Successfully"
);



setForm({

customerId:"",
productId:"",
quantity:""

});


setTotal(0);


loadData();



}

catch(error:any){


toast.error(

error.response?.data?.message ||

"Sale Failed"

);


}



};








const deleteSale=async(id:string)=>{


try{


await API.delete(

`/sales/${id}`

);



toast.success(
"Sale Deleted"
);



loadData();



}

catch(error){


toast.error(
"Delete Failed"
);


}


};









return(


<Layout>



<h1 className="
text-4xl
font-bold
mb-2
">

Sales

</h1>


<p className="
text-gray-500
mb-8
">

Sales & Invoice Management

</p>








<div className="
bg-white
rounded-2xl
shadow-lg
p-8
mb-8
">


<h2 className="
text-xl
font-semibold
mb-6
">

Create New Sale

</h2>






<form

onSubmit={createSale}

className="
grid
md:grid-cols-4
gap-4
">





<select

className="
border
p-3
rounded-xl
"

value={form.customerId}

onChange={
e=>setForm({
...form,
customerId:e.target.value
})
}

>



<option value="">

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








<select

className="
border
p-3
rounded-xl
"

value={form.productId}

onChange={
e=>setForm({
...form,
productId:e.target.value
})
}

>


<option value="">

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








<input

className="
border
p-3
rounded-xl
"

placeholder="Quantity"

value={form.quantity}

onChange={
e=>setForm({
...form,
quantity:e.target.value
})
}

/>








<div className="
bg-slate-100
rounded-xl
p-3
font-bold
">

₹ {total}

</div>







<button

className="
bg-green-600
text-white
rounded-xl
"

>

Create Sale

</button>





</form>


</div>









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


<th className="p-5">
Customer
</th>


<th>
Product
</th>


<th>
Quantity
</th>


<th>
Amount
</th>


<th>
Date
</th>


<th>
Action
</th>


</tr>


</thead>







<tbody>


{


sales.map((s)=>(



<tr

key={s.id}

className="
border-b
hover:bg-gray-50
">



<td className="p-5">

{s.customer.name}

</td>




<td>

{s.product.name}

</td>




<td>

{s.quantity}

</td>





<td>

₹{s.totalPrice}

</td>





<td>

{
new Date(
s.createdAt
)
.toLocaleDateString()
}

</td>





<td>


<button

onClick={()=>deleteSale(s.id)}

className="
bg-red-600
text-white
px-4
py-2
rounded-lg
"

>

Delete

</button>


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


export default Sales;