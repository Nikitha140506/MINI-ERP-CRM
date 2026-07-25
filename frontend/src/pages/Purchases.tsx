import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../layouts/Layout";
import { toast } from "react-toastify";


function Purchases(){


const [purchases,setPurchases] = useState<any[]>([]);

const [suppliers,setSuppliers] = useState<any[]>([]);

const [products,setProducts] = useState<any[]>([]);



const [form,setForm] = useState({

supplierId:"",
productId:"",
quantity:"",
purchasePrice:""

});






const loadData = async()=>{


try{


const purchaseRes = await API.get("/purchases");

console.log(
"PURCHASE RESPONSE:",
purchaseRes.data
);


setPurchases(
purchaseRes.data.purchases || []
);





const supplierRes = await API.get("/suppliers");


console.log(
"SUPPLIER RESPONSE:",
supplierRes.data
);



setSuppliers(
supplierRes.data.suppliers || []
);







const productRes = await API.get("/products");


console.log(
"PRODUCT RESPONSE:",
productRes.data
);



setProducts(
productRes.data.products || []
);



}


catch(error:any){


console.log(
"LOAD ERROR:",
error.response?.data || error
);


}


};








useEffect(()=>{

loadData();

},[]);









const addPurchase = async(e:any)=>{


e.preventDefault();



if(
!form.supplierId ||
!form.productId ||
!form.quantity ||
!form.purchasePrice
){

toast.error(
"Please fill all fields"
);

return;

}





try{


await API.post(

"/purchases",

{

supplierId:form.supplierId,

productId:form.productId,

quantity:Number(form.quantity),

purchasePrice:Number(form.purchasePrice)

}

);




toast.success(
"Purchase Added"
);




setForm({

supplierId:"",
productId:"",
quantity:"",
purchasePrice:""

});



loadData();



}



catch(error:any){


toast.error(

error.response?.data?.message ||
"Purchase failed"

);


}



};









return(

<Layout>


<h1 className="
text-4xl
font-bold
mb-8
">

Purchases

</h1>







<div className="
bg-white
rounded-2xl
shadow-lg
p-8
mb-8
">


<h2 className="
text-xl
font-bold
mb-5
">

Add Purchase

</h2>





<form

onSubmit={addPurchase}

className="
grid
md:grid-cols-2
gap-4
"

>






{/* Supplier */}

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

suppliers.map((s:any)=>(


<option

key={s.id}

value={s.id}

>

{s.companyName}

</option>



))

}



</select>








{/* Product */}


<select

className="
border
p-3
rounded-xl
"

value={form.productId}


onChange={(e)=>

setForm({

...form,

productId:e.target.value

})

}


>


<option value="">

Select Product

</option>



{

products.map((p:any)=>(


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

type="number"

min="1"

className="
border
p-3
rounded-xl
"

placeholder="Quantity"


value={form.quantity}


onChange={(e)=>

setForm({

...form,

quantity:e.target.value

})

}


/>










<input

type="number"

min="1"

step="0.01"

className="
border
p-3
rounded-xl
"

placeholder="Purchase Price"


value={form.purchasePrice}


onChange={(e)=>

setForm({

...form,

purchasePrice:e.target.value

})

}


/>








<button

type="submit"

className="
bg-indigo-600
text-white
rounded-xl
p-3
"

>

Add Purchase

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


<th className="p-4">
Supplier
</th>


<th>
Product
</th>


<th>
Quantity
</th>


<th>
Purchase Price
</th>


<th>
Total Amount
</th>



</tr>


</thead>





<tbody>



{

purchases.length===0 ?


<tr>

<td

colSpan={5}

className="
text-center
p-5
"

>

No Purchases Found

</td>

</tr>



:


purchases.map((p:any)=>(


<tr

key={p.id}

className="
border-b
"


>


<td className="p-4">

{p.supplier?.companyName}

</td>




<td>

{p.product?.name}

</td>




<td>

{p.quantity}

</td>




<td>

₹{p.purchasePrice}

</td>




<td>

₹{p.totalAmount}

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


export default Purchases;