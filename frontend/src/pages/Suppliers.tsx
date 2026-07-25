import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import Layout from "../layouts/Layout";


function Suppliers(){


const [suppliers,setSuppliers] = useState<any[]>([]);

const [editId,setEditId] = useState("");

const [loading,setLoading] = useState(false);



const initialForm = {

companyName:"",
contactPerson:"",
email:"",
phone:"",
gstNumber:"",
address:""

};


const [form,setForm] = useState(initialForm);






const loadSuppliers = async()=>{


try{


setLoading(true);


const res = await API.get("/suppliers");


setSuppliers(
res.data.suppliers || []
);


}


catch(error:any){


toast.error(
error.response?.data?.message ||
"Failed loading suppliers"
);


}


finally{

setLoading(false);

}


};







useEffect(()=>{


loadSuppliers();


},[]);








const resetForm=()=>{


setEditId("");


setForm(initialForm);


};








const saveSupplier = async(e:any)=>{


e.preventDefault();


try{


if(editId){


await API.put(

`/suppliers/${editId}`,

form

);


toast.success(
"Supplier Updated"
);


}

else{


await API.post(

"/suppliers",

form

);


toast.success(
"Supplier Added"
);


}



resetForm();


loadSuppliers();


}



catch(error:any){


toast.error(

error.response?.data?.message ||

"Operation failed"

);


}



};










const editSupplier=(s:any)=>{


setEditId(s.id);


setForm({

companyName:s.companyName || "",

contactPerson:s.contactPerson || "",

email:s.email || "",

phone:s.phone || "",

gstNumber:s.gstNumber || "",

address:s.address || ""

});


};










const deleteSupplier=async(id:string)=>{


const confirmDelete =
window.confirm(
"Are you sure you want to delete this supplier?"
);


if(!confirmDelete) return;



try{


await API.delete(

`/suppliers/${id}`

);



toast.success(
"Supplier Deleted"
);



loadSuppliers();


}


catch(error:any){


toast.error(

error.response?.data?.message ||

"Delete failed"

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

Suppliers

</h1>



<p className="
text-gray-500
mb-8
">

Supplier Management

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
font-bold
mb-5
">

{

editId
?
"Edit Supplier"
:
"Add Supplier"

}

</h2>









<form

onSubmit={saveSupplier}

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

placeholder="Company Name"

value={form.companyName}

onChange={(e)=>

setForm({

...form,

companyName:e.target.value

})

}

/>







<input

className="
border
p-3
rounded-xl
"

placeholder="Contact Person"

value={form.contactPerson}

onChange={(e)=>

setForm({

...form,

contactPerson:e.target.value

})

}

/>







<input

className="
border
p-3
rounded-xl
"

placeholder="Email"

type="email"

value={form.email}

onChange={(e)=>

setForm({

...form,

email:e.target.value

})

}

/>







<input

className="
border
p-3
rounded-xl
"

placeholder="Phone"

value={form.phone}

onChange={(e)=>

setForm({

...form,

phone:e.target.value

})

}

/>







<input

className="
border
p-3
rounded-xl
"

placeholder="GST Number"

value={form.gstNumber}

onChange={(e)=>

setForm({

...form,

gstNumber:e.target.value

})

}

/>







<input

className="
border
p-3
rounded-xl
"

placeholder="Address"

value={form.address}

onChange={(e)=>

setForm({

...form,

address:e.target.value

})

}

/>







<button

className="
bg-blue-600
hover:bg-blue-700
text-white
rounded-xl
py-3
"

>


{

editId

?
"Update Supplier"

:
"Add Supplier"

}


</button>





{

editId &&

<button

type="button"

onClick={resetForm}

className="
bg-gray-500
text-white
rounded-xl
py-3
"

>

Cancel

</button>


}



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


<th className="p-4 text-left">
Company
</th>


<th>
Contact
</th>


<th>
Email
</th>


<th>
Phone
</th>


<th>
Actions
</th>


</tr>


</thead>






<tbody>



{

loading ?


<tr>

<td
colSpan={5}
className="
text-center
p-5
"
>

Loading...

</td>

</tr>



:

suppliers.length===0 ?


<tr>

<td

colSpan={5}

className="
text-center
p-5
"

>

No Suppliers Found

</td>

</tr>



:


suppliers.map((s:any)=>(


<tr

key={s.id}

className="
border-b
hover:bg-gray-50
"

>



<td className="p-4">

{s.companyName}

</td>





<td>

{s.contactPerson}

</td>





<td>

{s.email}

</td>





<td>

{s.phone}

</td>






<td>


<button

onClick={()=>editSupplier(s)}

className="
bg-blue-600
text-white
px-3
py-2
rounded-lg
mr-2
"

>

Edit

</button>





<button

onClick={()=>deleteSupplier(s.id)}

className="
bg-red-600
text-white
px-3
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


export default Suppliers;