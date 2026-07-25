import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import API from "../api/axios";
import { toast } from "react-toastify";


function Warehouse(){


const [products,setProducts] = useState<any[]>([]);

const [search,setSearch] = useState("");





const getProducts = async()=>{


try{


const res = await API.get("/products");


setProducts(
res.data.products || []
);


}


catch(error){


toast.error(
"Failed loading warehouse data"
);


}


};







useEffect(()=>{


getProducts();


},[]);








const filteredProducts = products.filter((p)=>


p.name
.toLowerCase()
.includes(
search.toLowerCase()
)


);








const totalProducts = products.length;


const lowStock = products.filter(

p=>p.stock <=5

).length;





const inventoryValue = products.reduce(

(sum,p)=>

sum + (p.price * p.stock),

0

);







return(


<Layout>



<h1 className="
text-4xl
font-bold
mb-2
">

Warehouse

</h1>



<p className="
text-gray-500
mb-8
">

Inventory and Stock Management

</p>







{/* CARDS */}


<div className="
grid
md:grid-cols-3
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

Total Products

</p>


<h2 className="
text-4xl
font-bold
mt-3
">

{totalProducts}

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

Low Stock Products

</p>


<h2 className="
text-4xl
font-bold
text-red-600
mt-3
">

{lowStock}

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

Inventory Value

</p>


<h2 className="
text-4xl
font-bold
text-green-600
mt-3
">

₹{inventoryValue}

</h2>


</div>





</div>









{/* SEARCH */}


<input

className="
border
rounded-xl
p-3
w-80
mb-6
"

placeholder="Search Product..."

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

/>









{/* TABLE */}


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

Product

</th>


<th>

Category

</th>


<th>

Stock

</th>


<th>

Price

</th>


<th>

Status

</th>


</tr>


</thead>








<tbody>


{

filteredProducts.map((p)=>(


<tr

key={p.id}

className="
border-b
hover:bg-gray-50
"

>


<td className="
p-5
font-semibold
">

{p.name}

</td>



<td>

{p.category}

</td>





<td>

{p.stock}

</td>






<td>

₹{p.price}

</td>






<td>


{

p.stock <= 5

?


<span

className="
bg-red-100
text-red-700
px-3
py-1
rounded-full
"

>

Low Stock

</span>


:


<span

className="
bg-green-100
text-green-700
px-3
py-1
rounded-full
"

>

Available

</span>


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


export default Warehouse;