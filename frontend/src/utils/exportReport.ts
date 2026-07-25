import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";



export const exportPDF = (
title:string,
columns:any[],
data:any[]
)=>{


const doc = new jsPDF();


doc.text(
title,
14,
15
);



autoTable(doc,{

head:[columns],

body:data

});


doc.save(
`${title}.pdf`
);


};





export const exportExcel = (

fileName:string,
data:any[]

)=>{


const worksheet =
XLSX.utils.json_to_sheet(data);


const workbook =
XLSX.utils.book_new();



XLSX.utils.book_append_sheet(

workbook,

worksheet,

"Report"

);



XLSX.writeFile(

workbook,

`${fileName}.xlsx`

);


};