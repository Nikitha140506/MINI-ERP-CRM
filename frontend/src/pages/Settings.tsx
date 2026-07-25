import { FaMoon, FaSun, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import Layout from "../layouts/Layout";
import { useNavigate } from "react-router-dom";


function Settings(){


const {dark,setDark}=useTheme();

const navigate = useNavigate();



const user = JSON.parse(
localStorage.getItem("user") || "{}"
);



const logout = ()=>{

localStorage.removeItem("user");
localStorage.removeItem("token");

navigate("/login");

};




return(


<Layout>


<div
className={`
min-h-screen
p-8

${dark ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}

`}
>


<h1

className="
text-3xl
font-bold
mb-8
"

>

Settings

</h1>




{/* PROFILE */}



<div

className={`
rounded-3xl
shadow-xl
p-6
mb-8

${dark ? "bg-gray-800":"bg-white"}

`}

>


<div
className="
flex
items-center
gap-5
"
>


<div

className="
w-16
h-16
rounded-full
bg-indigo-600
text-white
flex
items-center
justify-center
text-2xl
font-bold
"

>

{
user.name?.charAt(0)
}

</div>




<div>


<h2 className="text-xl font-bold">

{user.name}

</h2>


<p

className={`
${dark ? "text-gray-400":"text-gray-500"}
`}

>

{user.email}

</p>



<p

className="
text-indigo-500
font-semibold
"

>

{user.role}

</p>



</div>



</div>


</div>





{/* THEME SETTINGS */}



<div

className={`
rounded-3xl
shadow-xl
p-6
mb-8

${dark ? "bg-gray-800":"bg-white"}

`}

>


<h2 className="text-xl font-bold mb-5">

Appearance

</h2>



<div

className="
flex
items-center
justify-between
"

>


<p>

Dark Mode

</p>



<button

onClick={()=>setDark(!dark)}

className="
flex
items-center
gap-3
px-5
py-3
rounded-xl
bg-indigo-600
text-white
"

>


{

dark

?

<>

<FaSun/>

Light Mode

</>

:

<>

<FaMoon/>

Dark Mode

</>

}


</button>



</div>



</div>





{/* ACCOUNT ACTION */}



<div

className={`
rounded-3xl
shadow-xl
p-6

${dark ? "bg-gray-800":"bg-white"}

`}

>


<h2 className="text-xl font-bold mb-5">

Account

</h2>



<button

onClick={logout}

className="
flex
items-center
gap-3
bg-red-600
hover:bg-red-700
text-white
px-6
py-3
rounded-xl
"

>

<FaSignOutAlt/>

Logout

</button>



</div>



</div>


</Layout>


);


}


export default Settings;