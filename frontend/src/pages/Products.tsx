import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import Layout from "../layouts/Layout";
import { useSearchParams } from "react-router-dom";


function Products(){


const [products,setProducts] = useState<any[]>([]);

const [suppliers,setSuppliers] = useState<any[]>([]);

const [search,setSearch] = useState("");

const [searchParams] = useSearchParams();

const globalSearch =
searchParams.get("search") || "";


const [editId,setEditId] = useState("");



const [form,setForm] = useState({

name:"",
description:"",
price:"",
stock:"",
category:"",
supplierId:""

});





const getProducts = async()=>{


try{


const res = await API.get("/products");


setProducts(
res.data.products || []
);


}

catch(error){

toast.error(
"Failed loading products"
);

}


};





const getSuppliers = async()=>{


try{


const res = await API.get("/suppliers");


setSuppliers(
res.data.suppliers || []
);


}

catch(error){

console.log(error);

}


};






useEffect(()=>{


getProducts();

getSuppliers();


},[]);







const saveProduct = async(e:any)=>{


e.preventDefault();


try{


if(editId){


await API.put(

`/products/${editId}`,

{

...form,

price:Number(form.price),

stock:Number(form.stock)

}

);



toast.success(
"Product Updated"
);



}
else{


await API.post(

"/products",

{

...form,

price:Number(form.price),

stock:Number(form.stock)

}

);



toast.success(
"Product Added"
);



}




setEditId("");



setForm({

name:"",
description:"",
price:"",
stock:"",
category:"",
supplierId:""

});



getProducts();



}

catch(error:any){


toast.error(

error.response?.data?.message ||

"Operation failed"

);


}



};






const editProduct=(p:any)=>{


setEditId(p.id);



setForm({

name:p.name,

description:p.description || "",

price:String(p.price),

stock:String(p.stock),

category:p.category,

supplierId:p.supplierId || ""

});


};






const deleteProduct=async(id:string)=>{


try{


await API.delete(

`/products/${id}`

);



toast.success(
"Product Deleted"
);



getProducts();



}

catch(error){


toast.error(
"Delete Failed"
);


}


};





const filteredProducts = products.filter((p)=>


p.name
.toLowerCase()
.includes(
(search || globalSearch).toLowerCase()
)


);

return(

<Layout>


<div className="
max-w-[1400px]
mx-auto
">


<h1 className="
text-4xl
font-bold
mb-2
">

Products

</h1>



<p className="
text-gray-500
mb-8
">

Inventory Management

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
mb-5
">


{

editId

?

"Edit Product"

:

"Add Product"


}


</h2>





<form

onSubmit={saveProduct}

className="
grid
md:grid-cols-2
gap-4
"

>





<input

className="
border
p-3
rounded-xl
"

placeholder="Product Name"

value={form.name}

onChange={(e)=>

setForm({

...form,

name:e.target.value

})

}

/>







<input

className="
border
p-3
rounded-xl
"

placeholder="Category"

value={form.category}

onChange={(e)=>

setForm({

...form,

category:e.target.value

})

}

/>








<input

className="
border
p-3
rounded-xl
"

placeholder="Description"

value={form.description}

onChange={(e)=>

setForm({

...form,

description:e.target.value

})

}

/>









<input

className="
border
p-3
rounded-xl
"

placeholder="Price"

type="number"

value={form.price}

onChange={(e)=>

setForm({

...form,

price:e.target.value

})

}

/>








<input

className="
border
p-3
rounded-xl
"

placeholder="Stock"

type="number"

value={form.stock}

onChange={(e)=>

setForm({

...form,

stock:e.target.value

})

}

/>







<select

className="
border
p-3
rounded-xl
"

value={form.supplierId}

onChange={(e)=>

setForm({

...form,

supplierId:e.target.value

})

}

>


<option value="">

Select Supplier

</option>



{

suppliers.map((s)=>(


<option

key={s.id}

value={s.id}

>

{s.companyName}

</option>


))


}



</select>









<button

className="
bg-blue-600
hover:bg-blue-700
text-white
rounded-xl
py-3
transition
"

>


{

editId

?

"Update Product"

:

"Add Product"


}


</button>







{

editId &&

<button

type="button"

onClick={()=>{


setEditId("");

setForm({

name:"",
description:"",
price:"",
stock:"",
category:"",
supplierId:""

});


}}

className="
bg-gray-500
text-white
rounded-xl
"

>

Cancel

</button>


}





</form>



</div>






<div className="
mb-5
">


<input


className="
border
rounded-xl
p-3
w-80
"


placeholder="Search Product..."

value={search}


onChange={(e)=>

setSearch(
e.target.value
)

}



/>


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


<th className="p-5 text-left">
Name
</th>


<th>
Category
</th>


<th>
Supplier
</th>


<th>
Price
</th>


<th>
Stock
</th>


<th>
Actions
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
transition
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

{

p.supplier?.companyName ||

"Not Assigned"

}

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

Low Stock ({p.stock})

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

{p.stock} Available

</span>


}



</td>








<td className="
space-x-2
">



<button


onClick={()=>editProduct(p)}


className="
bg-blue-600
text-white
px-3
py-2
rounded-lg
hover:bg-blue-700
"

>

Edit

</button>








<button


onClick={()=>deleteProduct(p.id)}


className="
bg-red-600
text-white
px-3
py-2
rounded-lg
hover:bg-red-700
"

>

Delete

</button>



</td>






</tr>


))


}



{

filteredProducts.length === 0 &&


<tr>

<td

colSpan={6}

className="
text-center
p-6
text-gray-500
"

>

No Products Found

</td>

</tr>


}



</tbody>



</table>



</div>






</div>


</Layout>


);


}


export default Products;