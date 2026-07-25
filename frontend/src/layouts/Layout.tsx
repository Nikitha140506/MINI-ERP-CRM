import Sidebar from "../components/Sidebar";

import { FaBell, FaSearch, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

import { useState, useEffect } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";


function Layout({children}:any){

const navigate = useNavigate();

const {dark,setDark}=useTheme();

const [search,setSearch] = useState("");

const [showNotifications,setShowNotifications] = useState(false);

const [notifications,setNotifications] = useState<any[]>([]);


const user = JSON.parse(
    localStorage.getItem("user") || "{}"
);



useEffect(()=>{


const loadNotifications = async()=>{


try{


const res = await API.get(
"/inventory/low-stock"
);


setNotifications(
res.data.products || []
);


}

catch(error:any){

console.log(
error.response?.data
);

}


};



loadNotifications();


},[]);





    

return(

<div className={`
flex
min-h-screen
${dark ? "dark bg-gray-900" : "bg-gray-100"}
`}>


{/* SIDEBAR */}


<Sidebar />





{/* MAIN CONTENT AREA */}


<div className="
flex-1
p-4
">





{/* TOP NAVBAR */}



<div
className={`
h-20
rounded-2xl
shadow-md
flex
items-center
justify-between
px-8
mb-4
${dark ? "bg-gray-800 text-white" : "bg-white"}
`}
>




{/* SEARCH */}


<div
className={`
flex
items-center
rounded-xl
px-4
w-150
${dark ? "bg-gray-700" : "bg-gray-100"}
`}
>

<FaSearch 
className="text-gray-400"
/>

<input

className={`
bg-transparent
outline-none
px-3
w-full
${dark ? "text-white placeholder-gray-300" : ""}
`}




placeholder="Search products/customers..."

value={search}

onChange={(e)=>{


setSearch(e.target.value);


navigate(
`/search?q=${e.target.value}`
);


}}


/>


</div>







{/* RIGHT SIDE */}


<div className="
flex
items-center
gap-6
">






{/* NOTIFICATION */}


<div className="relative">

<button
onClick={()=>setDark(!dark)}
className="theme-toggle text-xl"
>
{
dark ? <FaSun/> : <FaMoon/>
}
</button>
<button

onClick={()=>setShowNotifications(!showNotifications)}

className="
relative
text-xl
text-gray-600
"

>


<FaBell/>




{
notifications.length > 0 &&

<span

className="
absolute
-top-2
-right-3
bg-red-600
text-white
text-xs
rounded-full
px-2
"

>


{notifications.length}


</span>


}



</button>






{

showNotifications &&


<div

className="
absolute
right-0
mt-4
w-80
bg-white
shadow-xl
rounded-xl
p-4
z-50
"

>


<h3 className="
font-bold
mb-3
">

Notifications

</h3>



{

notifications.length === 0 ?


<p className="
text-gray-500
">

No notifications

</p>



:


notifications.map((item:any)=>(


<div

key={item.id}

className="
border-b
py-3
"

>


<p className="
font-semibold
">

Low Stock Alert

</p>



<p className="
text-sm
text-gray-500
">

{item.name}

only {item.stock} left

</p>


</div>


))


}



</div>


}



</div>








{/* USER */}


{/* USER PROFILE */}


<button

onClick={()=>navigate("/profile")}

className="
flex
items-center
gap-3
hover:bg-gray-100
px-3
py-2
rounded-xl
transition
"


>


{/* Avatar */}

<div

className="
w-10
h-10
rounded-full
bg-purple-600
text-white
flex
items-center
justify-center
font-bold
text-lg
"

>

{
user.name?.charAt(0)
}

</div>




<div
className="text-left"
>


<p className="
font-semibold
">

{user.name}

</p>



<p className="
text-sm
text-gray-500
">

{user.role}

</p>


</div>



</button>




</div>





</div>







{/* PAGE CONTENT */}


<div className="
px-4
pb-6
">

{children}


</div>






</div>




</div>


);


}



export default Layout;