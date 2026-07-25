import {
  FaChartPie,
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
  FaBuilding,
  FaWarehouse,
  FaFileInvoice,
  FaMoneyBill,
  FaTruck,
  FaShoppingBag,
} from "react-icons/fa";

import { useTheme } from "../context/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";



const Sidebar = () => {


const navigate = useNavigate();

const { dark } = useTheme();



const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);


const role = user?.role;



const logout = () => {

  localStorage.removeItem("user");

  localStorage.removeItem("token");

  navigate("/login");

};




const menus = [


{
name:"Dashboard",
path:"/dashboard",
icon:<FaChartPie/>,
roles:[
"ADMIN",
"SALES",
"WAREHOUSE",
"ACCOUNTS"
]
},



{
name:"Customers",
path:"/customers",
icon:<FaUsers/>,
roles:[
"ADMIN",
"SALES"
]
},



{
name:"Products",
path:"/products",
icon:<FaBoxOpen/>,
roles:[
"ADMIN",
"SALES",
"WAREHOUSE"
]
},



{
name:"Sales",
path:"/sales",
icon:<FaShoppingCart/>,
roles:[
"ADMIN",
"SALES"
]
},



{
name:"Warehouse",
path:"/warehouse",
icon:<FaWarehouse/>,
roles:[
"ADMIN",
"WAREHOUSE"
]
},



{
name:"Invoices",
path:"/invoices",
icon:<FaFileInvoice/>,
roles:[
"ADMIN",
"SALES",
"ACCOUNTS"
]
},



{
name:"Accounts",
path:"/accounts",
icon:<FaMoneyBill/>,
roles:[
"ADMIN",
"ACCOUNTS"
]
},



{
name:"Reports",
path:"/reports",
icon:<FaChartBar/>,
roles:[
"ADMIN",
"ACCOUNTS"
]
},



{
name:"Suppliers",
path:"/suppliers",
icon:<FaTruck/>,
roles:[
"ADMIN",
"WAREHOUSE"
]
},



{
name:"Purchases",
path:"/purchases",
icon:<FaShoppingBag/>,
roles:[
"ADMIN",
"WAREHOUSE"
]
},



{
name:"Settings",
path:"/settings",
icon:<FaCog/>,
roles:[
"ADMIN"
]
}


];





return (

<aside

className={`
w-64
min-h-screen
flex
flex-col
shadow-xl
transition-all

${
dark
?
"bg-slate-900 text-white"
:
"bg-white text-gray-800"
}

`}

>


{/* Logo */}

<div

className={`

px-6
py-5
border-b

${
dark
?
"border-slate-700"
:
"border-gray-200"
}

`}

>


<div className="
flex
items-center
gap-3
">


<div className="
bg-blue-600
p-2.5
rounded-xl
">


<FaBuilding className="text-xl"/>


</div>



<div>


<h1 className="
text-xl
font-bold
">

ERP PRO

</h1>


<p

className={`

text-sm

${
dark
?
"text-slate-400"
:
"text-gray-500"
}

`}

>

Enterprise Suite

</p>


</div>


</div>


</div>





{/* Menu */}


<nav className="
flex-1
mt-6
px-4
">


{

menus

.filter(
(item)=>
item.roles.includes(role)
)

.map((item)=>(


<NavLink

key={item.path}

to={item.path}

className={({isActive})=>

`

flex
items-center
gap-4
px-5
py-4
rounded-xl
mb-2
transition-all


${
isActive

?

"bg-blue-600 text-white shadow-lg"

:

dark

?

"hover:bg-slate-800 text-slate-300"

:

"hover:bg-gray-100 text-gray-600"

}

`

}

>


<span className="
text-lg
">

{item.icon}

</span>


<span>

{item.name}

</span>


</NavLink>


))


}


</nav>






{/* Profile */}


<div className="

border-t
border-slate-700
p-6

">


<div

className={`

rounded-xl
p-4

${
dark
?
"bg-slate-800"
:
"bg-gray-100"
}

`}

>


<h3 className="
font-semibold
">

{
user?.name || "User"
}

</h3>



<p className="
text-sm
text-slate-400
">

{
user?.email || ""
}

</p>



<p className="
text-xs
mt-1
text-blue-400
">

{
role
}

</p>




<button

onClick={logout}

className="

mt-4
w-full
flex
items-center
justify-center
gap-2
bg-red-600
hover:bg-red-700
py-2
rounded-lg
transition

"

>


<FaSignOutAlt/>

Logout


</button>



</div>


</div>



</aside>


);


};


export default Sidebar;