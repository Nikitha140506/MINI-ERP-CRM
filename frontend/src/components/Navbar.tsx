import { Link, useNavigate } from "react-router-dom";
import { FaChartBar } from "react-icons/fa";
import {
    FaHome,
    FaUsers,
    FaBox,
    FaShoppingCart,
    FaFileInvoice,
    FaSignOutAlt
} from "react-icons/fa";
import { useState } from "react";
import { FaWarehouse } from "react-icons/fa";
function Navbar(){


const navigate = useNavigate();


const [search,setSearch] = useState("");

const user = JSON.parse(
    localStorage.getItem("user") || "{}"
);



const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    console.log("Logged out");

    window.location.href = "/login";

};





return(


<div className="
fixed
left-0
top-0
h-screen
w-64
bg-slate-900
text-white
p-6
">



<h1 className="
text-3xl
font-bold
mb-10
">

ERP Pro

</h1>





<nav className="
space-y-4
">



<Link
to="/dashboard"
className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-slate-700
">

<FaHome/>

Dashboard

</Link>
<Link
    to="/reports"
    className="
    flex
    items-center
    gap-3
    p-3
    rounded-xl
    hover:bg-slate-700
    "
>
    <FaChartBar />
    Reports
</Link>
<Link
    to="/inventory"
    className="
    flex
    items-center
    gap-3
    p-3
    rounded-xl
    hover:bg-slate-700
    "
>
    <FaWarehouse />
    Inventory
</Link>



<Link
to="/customers"
className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-slate-700
">

<FaUsers/>

Customers

</Link>





<Link
to="/products"
className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-slate-700
">

<FaBox/>

Products

</Link>






<Link
to="/sales"
className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-slate-700
">

<FaShoppingCart/>

Sales

</Link>






<Link
to="/invoices"
className="
flex
items-center
gap-3
p-3
rounded-xl
hover:bg-slate-700
">

<FaFileInvoice/>

Invoices

</Link>




</nav>





<div className="
absolute
bottom-6
left-6
right-6
">



<p className="
text-sm
text-gray-400
mb-3
">

{user.name}

({user.role})

</p>




<button

onClick={logout}

className="
w-full
bg-red-600
p-3
rounded-xl
flex
items-center
justify-center
gap-2
hover:bg-red-700
"

>

<FaSignOutAlt/>

Logout

</button>




</div>





</div>


);


}


export default Navbar;