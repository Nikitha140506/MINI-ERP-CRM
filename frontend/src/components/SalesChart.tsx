import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { useTheme } from "../context/ThemeContext";
import { Bar, Doughnut } from "react-chartjs-2";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);


interface Props {
    analytics:any;
}


function SalesChart({analytics={}}:Props){


const {dark}=useTheme();



const textColor = dark ? "#ffffff" : "#111827";


const barData = {

labels:[
"Revenue",
"Sales",
"Products",
"Customers"
],

datasets:[

{
label:"ERP Analytics",

data:[

analytics.revenue,
analytics.totalSales,
analytics.totalProducts,
analytics.totalCustomers

],

backgroundColor:[
"#6366f1",
"#22c55e",
"#f97316",
"#ec4899"
]

}

]

};



const doughnutData={

labels:

analytics.topProducts.map(
(p:any)=>p.name
),


datasets:[

{

data:

analytics.topProducts.map(
(p:any)=>p.sold
),


backgroundColor:[

"#6366f1",
"#22c55e",
"#f97316",
"#ec4899",
"#14b8a6"

]

}

]

};





const options={

plugins:{

legend:{

labels:{

color:textColor

}

},


tooltip:{

backgroundColor: dark ? "#1f2937":"#ffffff",

titleColor:textColor,

bodyColor:textColor

}

}

};




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




{/* BAR CHART */}


<div

className={`
p-6
rounded-xl
shadow-xl

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
mb-4
"

>

ERP Statistics

</h2>



<Bar

data={barData}

options={options}

/>


</div>





{/* DOUGHNUT CHART */}


<div

className={`
p-6
rounded-xl
shadow-xl

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
mb-4
"

>

Top Selling Products

</h2>



<Doughnut

data={doughnutData}

options={options}

/>


</div>



</div>


);


}


export default SalesChart;