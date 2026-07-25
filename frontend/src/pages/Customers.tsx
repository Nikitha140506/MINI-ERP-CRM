import { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";
import Layout from "../layouts/Layout";


function Customers(){


const [customers,setCustomers] = useState<any[]>([]);


const [search,setSearch] = useState("");



const [editId,setEditId] = useState("");



const [form,setForm] = useState({

name:"",
email:"",
phone:"",
address:""

});






const getCustomers = async()=>{


try{


const res = await API.get("/customers");


setCustomers(
res.data.customers
);


}

catch(error){

toast.error("Failed loading customers");

}


};





useEffect(()=>{

getCustomers();

},[]);







const saveCustomer = async (e: any) => {

  e.preventDefault();

  // Validation
  if (!form.name.trim()) {
    toast.error("Name is required");
    return;
  }

  if (!form.email.trim()) {
    toast.error("Email is required");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email)) {
    toast.error("Enter a valid email address");
    return;
  }

  if (!form.phone.trim()) {
    toast.error("Phone number is required");
    return;
  }

  const phoneRegex = /^[6-9]\d{9}$/;

  if (!phoneRegex.test(form.phone)) {
    toast.error("Enter a valid 10-digit phone number");
    return;
  }

  if (!form.address.trim()) {
    toast.error("Address is required");
    return;
  }

  try {

    if (editId) {

      await API.put(
        `/customers/${editId}`,
        form
      );

      toast.success("Customer Updated");

    } else {

      await API.post(
        "/customers",
        form
      );

      toast.success("Customer Added");
    }

    setEditId("");

    setForm({
      name: "",
      email: "",
      phone: "",
      address: ""
    });

    getCustomers();

  } catch (error: any) {

    toast.error(
      error.response?.data?.message ||
      "Operation failed"
    );

  }
};









const editCustomer=(customer:any)=>{


setEditId(customer.id);


setForm({

name:customer.name,

email:customer.email,

phone:customer.phone,

address:customer.address

});


};








const deleteCustomer = async (id: string) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this customer?"
  );

  if (!confirmDelete) {
    return;
  }

  try {

    await API.delete(`/customers/${id}`);

    toast.success("Customer Deleted Successfully");

    getCustomers();

  } catch (error) {

    toast.error("Delete failed");

  }

};








const filteredCustomers = customers.filter((c)=>

c.name
.toLowerCase()
.includes(
search.toLowerCase()
)

);







return(


<Layout>


<h1 className="
text-4xl
font-bold
mb-2
">

Customers

</h1>


<p className="
text-gray-500
mb-8
">

Customer Relationship Management

</p>









<div className="
bg-white
rounded-2xl
shadow-lg
p-8
mb-8
">


<h2 className="
font-semibold
text-xl
mb-5
">

{
editId
?
"Edit Customer"
:
"Add Customer"

}

</h2>




<form

onSubmit={saveCustomer}

className="
grid
md:grid-cols-2
gap-4
">



<input

className="border p-3 rounded-xl"

placeholder="Name"

value={form.name}

onChange={
e=>setForm({
...form,
name:e.target.value
})
}

/>




<input

className="border p-3 rounded-xl"

placeholder="Email"

value={form.email}

onChange={
e=>setForm({
...form,
email:e.target.value
})
}

/>





<input

className="border p-3 rounded-xl"

placeholder="Phone"

value={form.phone}

onChange={
e=>setForm({
...form,
phone:e.target.value
})
}

/>





<input

className="border p-3 rounded-xl"

placeholder="Address"

value={form.address}

onChange={
e=>setForm({
...form,
address:e.target.value
})
}

/>





<button

className="
bg-slate-900
text-white
rounded-xl
py-3
"

>

{

editId

?

"Update Customer"

:

"Add Customer"

}


</button>



</form>



</div>









<div className="
flex
justify-between
mb-5
">



<input

className="
border
rounded-xl
p-3
w-80
"

placeholder="Search customer..."

value={search}

onChange={
e=>setSearch(
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



<table className="w-full">


<thead className="
bg-slate-900
text-white
">


<tr>


<th className="p-5 text-left">
Name
</th>


<th className="p-5">
Email
</th>


<th className="p-5">
Phone
</th>


<th className="p-5">
Address
</th>


<th className="p-5">
Actions
</th>


</tr>


</thead>





<tbody>



{

filteredCustomers.map((c)=>(



<tr

key={c.id}

className="
border-b
hover:bg-gray-50
">


<td className="p-5 font-semibold">

{c.name}

</td>


<td>

{c.email}

</td>


<td>

{c.phone}

</td>


<td>

{c.address}

</td>



<td className="space-x-2">


<button

onClick={()=>editCustomer(c)}

className="
bg-blue-600
text-white
px-3
py-2
rounded-lg
"

>

Edit

</button>



<button

onClick={()=>deleteCustomer(c.id)}

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


export default Customers;