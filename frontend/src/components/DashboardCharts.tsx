import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

import { useTheme } from "../context/ThemeContext";


interface Props {
    sales:any[];
}


function DashboardCharts({sales=[]}:Props){


const {dark}=useTheme();



const pieData=[

{
name:"Electronics",
value:400
},

{
name:"Accessories",
value:300
},

{
name:"Others",
value:200
}

];



const COLORS=[

"#6366f1",
"#22c55e",
"#f97316"

];



const salesData = sales.map((sale)=>({

name:sale.product?.name || "Unknown",

sales:sale.totalPrice

}));



return(


<div

className="
grid
grid-cols-1
lg:grid-cols-2
gap-8
mt-8
"

>



{/* SALES PERFORMANCE */}



<div

className={`

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


<h2

className="
text-xl
font-bold
mb-2
"

>

Sales Performance

</h2>



<p

className={`

text-sm

mb-6

${dark ? "text-gray-400":"text-gray-500"}

`}

>

Product wise sales performance

</p>





<ResponsiveContainer

width="100%"

height={300}

>


<BarChart

data={salesData}

>


<XAxis

dataKey="name"

tick={{

fill: dark ? "#e5e7eb":"#374151",

fontSize:12

}}

/>





<YAxis

tick={{

fill: dark ? "#e5e7eb":"#374151"

}}

/>





<Tooltip

formatter={(value)=>`₹${value}`}

contentStyle={{

backgroundColor: dark ? "#1f2937":"#ffffff",

color: dark ? "#ffffff":"#111827",

borderRadius:"12px",

border:"none"

}}

/>





<Bar

dataKey="sales"

name="Sales Amount"

fill={dark ? "#818cf8":"#6366f1"}

radius={[10,10,0,0]}

/>



</BarChart>


</ResponsiveContainer>



</div>







{/* PRODUCT CATEGORIES */}



<div

className={`

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


<h2

className="
text-xl
font-bold
mb-6
"

>

Product Categories

</h2>





<ResponsiveContainer

width="100%"

height={300}

>


<PieChart>


<Pie

data={pieData}

dataKey="value"

outerRadius={100}

label

>


{

pieData.map((_,index)=>(


<Cell

key={index}

fill={COLORS[index % COLORS.length]}

/>


))

}


</Pie>





<Legend

wrapperStyle={{

color: dark ? "#ffffff":"#111827"

}}

/>




<Tooltip

contentStyle={{

backgroundColor: dark ? "#1f2937":"#ffffff",

color: dark ? "#ffffff":"#111827"

}}

/>



</PieChart>


</ResponsiveContainer>



</div>




</div>


);


}


export default DashboardCharts;