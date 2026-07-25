import { useEffect, useState } from "react";
import API from "../api/axios";

import Layout from "../layouts/Layout";

import SalesChart from "../components/SalesChart";
import DashboardCharts from "../components/DashboardCharts";
import ActivityTimeline from "../components/ActivityTimeline";


import {
FaUsers,
FaBox,
FaShoppingCart,
FaRupeeSign,
FaUserTie,
FaFileInvoice
} from "react-icons/fa";


import { useTheme } from "../context/ThemeContext";


import {
ResponsiveContainer,
AreaChart,
Area,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
PieChart,
Pie,
Cell
} from "recharts";



function Dashboard(){


const {dark}=useTheme();



const [dashboard,setDashboard]=useState<any>({});

const [sales,setSales]=useState<any[]>([]);

const [products,setProducts]=useState<any[]>([]);

const [analytics,setAnalytics]=useState<any>(null);

const loadData = async()=>{

try{


const dash = await API.get("/dashboard");

const sale = await API.get("/sales");

const product = await API.get("/products");

const analyticsRes = await API.get("/analytics");





setDashboard(
dash.data.dashboard
);



setSales(
sale.data.sales || []
);



setProducts(
product.data.products || []
);



setAnalytics(
analyticsRes.data.analytics
);





}

catch(error){

console.log(error);

}


};



useEffect(()=>{

loadData();

},[]);





// Inventory Data

const stockData = products.map(p=>({

name:p.name,

value:p.stock

}));





const totalStock =
products.reduce(
(total,p)=>total+p.stock,
0
);



const lowStock =
products.filter(
p=>p.stock <= 5
).length;





// Revenue Analytics Data

const revenueData=[

{
month:"Jan",
revenue:12000
},

{
month:"Feb",
revenue:18000
},

{
month:"Mar",
revenue:15000
},

{
month:"Apr",
revenue:26000
},

{
month:"May",
revenue:32000
},

{
month:"Jun",
revenue:45000
}

];





const COLORS=[

"#6366f1",

"#22c55e",

"#f97316",

"#ec4899",

"#14b8a6"

];





const cards=[


{
title:"Total Users",
value:dashboard.totalUsers,
icon:<FaUsers/>
},



{
title:"Customers",
value:dashboard.totalCustomers,
icon:<FaUserTie/>
},



{
title:"Products",
value:dashboard.totalProducts,
icon:<FaBox/>
},



{
title:"Total Sales",
value:dashboard.totalSales,
icon:<FaShoppingCart/>
},



{
title:"Revenue",
value:`₹${dashboard.totalRevenue}`,
icon:<FaRupeeSign/>
},



{
title:"Invoices",
value:dashboard.totalInvoices,
icon:<FaFileInvoice/>
}


];





return(

<Layout>


<div

className={`

max-w-[1600px]

mx-auto

px-6

py-8

space-y-10

${dark ? "bg-gray-900 text-white":""}

`}

>{/* HEADER */}

<div>


<h1

className="

text-4xl

font-extrabold

bg-gradient-to-r

from-indigo-600

to-purple-600

bg-clip-text

text-transparent

"

>

ERP Dashboard

</h1>



<p

className={`

mt-3

${dark ? "text-gray-300":"text-gray-500"}

`}

>

Welcome back! Here's your business performance overview.

</p>


</div>






{/* KPI CARDS */}



<div

className="

grid

grid-cols-1

sm:grid-cols-2

lg:grid-cols-3

xl:grid-cols-4

gap-6

"

>



{

cards.map((card,index)=>(



<div

key={index}

className={`

rounded-3xl

shadow-md

p-7

min-h-[160px]

border

hover:-translate-y-1

hover:shadow-2xl

transition-all

duration-300



${

dark

?

"bg-gray-800 border-gray-700 text-white"

:

"bg-gradient-to-br from-white to-slate-100 border-gray-100"

}


`}

>



<div

className="

flex

justify-between

items-center

"

>


<div>


<p

className={`

font-medium

${dark ? "text-gray-300":"text-gray-500"}

`}

>

{card.title}

</p>




<h2

className={`

text-4xl

font-bold

mt-4

${dark ? "text-white":"text-slate-900"}

`}

>

{card.value}

</h2>


</div>




<div

className="

w-16

h-16

rounded-2xl

bg-gradient-to-br

from-indigo-600

to-purple-600

text-white

flex

items-center

justify-center

text-2xl

shadow-lg

"

>

{card.icon}

</div>



</div>



</div>



))


}



</div>{/* ANALYTICS CHARTS */}


<div

className="

grid

grid-cols-1

xl:grid-cols-2

gap-8

"

>




{/* REVENUE OVERVIEW */}


<div

className={`

rounded-3xl

shadow-xl

p-8

border



${

dark

?

"bg-gray-800 border-gray-700 text-white"

:

"bg-white border-indigo-100"

}


`}

>


<h2

className="

text-xl

font-bold

mb-2

"

>

Revenue Overview

</h2>



<p

className={`

text-sm

mb-6

${dark ? "text-gray-400":"text-gray-500"}

`}

>

Monthly revenue performance

</p>




<ResponsiveContainer

width="100%"

height={350}

>


<AreaChart

data={revenueData}

>


<CartesianGrid

strokeDasharray="3 3"

/>




<XAxis

dataKey="month"

/>




<YAxis />





<Tooltip

contentStyle={{

backgroundColor:dark?"#1f2937":"#ffffff",

color:dark?"white":"#111827",

borderRadius:"12px",

border:"none"

}}

/>





<Area

type="monotone"

dataKey="revenue"

stroke="#6366f1"

fill="#818cf8"

fillOpacity={0.35}

/>



</AreaChart>


</ResponsiveContainer>




</div>









{/* INVENTORY OVERVIEW */}



<div

className={`

rounded-3xl

shadow-xl

p-8

border



${

dark

?

"bg-gray-800 border-gray-700 text-white"

:

"bg-white border-emerald-100"

}


`}

>


<h2

className="

text-xl

font-bold

mb-6

"

>

Inventory Overview

</h2>





{/* STOCK SUMMARY */}



<div

className="

grid

grid-cols-3

gap-4

mb-6

"

>



<div

className="

bg-blue-50

rounded-xl

p-4

"

>


<p

className="


text-sm

text-grey-500

"

>

Total Stock

</p>


<h3

className="

text-2xl


font-bold

"

>

{totalStock}

</h3>


</div>






<div

className="

bg-red-50

rounded-xl

p-4

"

>


<p

className="

text-sm

text-gray-500

"

>

Low Stock

</p>


<h3

className="

text-2xl

font-bold

text-red-600

"

>

{lowStock}

</h3>


</div>






<div

className="

bg-green-50

rounded-xl

p-4

"

>


<p

className="

text-sm

text-black-500

"

>

Products

</p>


<h3

className="

text-2xl

font-bold

"

>

{products.length}

</h3>


</div>



</div>







<ResponsiveContainer

width="100%"

height={250}

>


<PieChart>


<Pie

data={stockData}

dataKey="value"

nameKey="name"

outerRadius={90}

>


{

stockData.map((_,index)=>(


<Cell

key={index}

fill={
COLORS[index % COLORS.length]
}

/>


))


}



</Pie>



<Tooltip />


</PieChart>


</ResponsiveContainer>



</div>





</div>
{/* RECENT SALES */}


<div

className={`

rounded-3xl

shadow-xl

p-8

border



${

dark

?

"bg-gray-800 border-gray-700 text-white"

:

"bg-white border-gray-100"

}


`}

>



<h2

className="

text-xl

font-bold

mb-6

"

>

Recent Sales

</h2>






<div className="overflow-x-auto">


<table className="w-full">


<thead

className="

bg-gradient-to-r

from-indigo-600

to-purple-600

text-white

"

>


<tr>


<th className="p-4 text-left">

Customer

</th>


<th className="p-4 text-left">

Product

</th>


<th className="p-4 text-left">

Quantity

</th>


<th className="p-4 text-left">

Amount

</th>


</tr>


</thead>






<tbody>


{


sales.slice(0,5).map((s)=>(


<tr

key={s.id}

className={`

border-b

transition



${

dark

?

"hover:bg-gray-700"

:

"hover:bg-indigo-50"

}

`}

>


<td className="p-4">

{s.customer?.name}

</td>



<td className="p-4">

{s.product?.name}

</td>




<td className="p-4">

{s.quantity}

</td>




<td

className="

p-4

font-semibold

text-indigo-600

"

>

₹{s.totalPrice}

</td>



</tr>


))


}



</tbody>


</table>


</div>



</div>








{/* EXTRA COMPONENTS */}



{

analytics && (

<SalesChart analytics={analytics}/>

)

}





<DashboardCharts sales={sales} />





<ActivityTimeline/>


</div>



</Layout>


);


}



export default Dashboard;