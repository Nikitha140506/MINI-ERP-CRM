import { useEffect, useState } from "react";
import API from "../api/axios";
import { useTheme } from "../context/ThemeContext";


function ActivityTimeline(){


const {dark}=useTheme();


const [activities,setActivities]=useState<any[]>([]);



useEffect(()=>{


const loadActivities = async()=>{

try{


const res = await API.get("/activity");


setActivities(
res.data.activities || []
);


}
catch(error){

console.log(error);

}


};


loadActivities();


},[]);




return(


<div

className={`
mt-8
rounded-3xl
shadow-xl
p-6

${
dark
?
"bg-gray-800 text-white"
:
"bg-white text-gray-800"
}

`}

>


<h2 className="text-xl font-bold mb-6">

Recent Activities

</h2>



<div className="space-y-5">


{

activities.length === 0 ?


<p className={`text-sm ${
dark ? "text-gray-400":"text-gray-500"
}`}>

No recent activities

</p>



:


activities.map(
(activity:any,index:number)=>(


<div

key={index}

className="
flex
gap-4
items-start
"

>


<div

className="
w-3
h-3
rounded-full
bg-indigo-600
mt-2
"

>

</div>



<div>


<p className="font-semibold">

{activity.title}

</p>



<p className={`text-sm ${
dark ? "text-gray-400":"text-gray-500"
}`}>

{activity.type}

&nbsp; • &nbsp;

{new Date(activity.time).toLocaleString()}

</p>


</div>


</div>


))


}


</div>


</div>


);


}


export default ActivityTimeline;