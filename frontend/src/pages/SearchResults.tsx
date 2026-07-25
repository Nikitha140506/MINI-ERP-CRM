import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import Layout from "../layouts/Layout";


function SearchResults(){

const [searchParams] = useSearchParams();

const keyword = searchParams.get("q") || "";

const [results,setResults] = useState<any>({});


useEffect(()=>{

const searchData = async()=>{

try{

const res = await API.get(
`/search?q=${keyword}`
);

setResults(res.data);

}
catch(error){

console.log(error);

}

};


if(keyword){
searchData();
}


},[keyword]);



return(

<Layout>

<h1 className="text-3xl font-bold mb-6">
Search Results : {keyword}
</h1>


<h2 className="text-xl font-bold">
Products
</h2>

{
results.products?.map((p:any)=>(

<div key={p.id}
className="bg-white p-4 rounded-xl my-2">

{p.name}

</div>

))
}


<h2 className="text-xl font-bold mt-6">
Customers
</h2>

{
results.customers?.map((c:any)=>(

<div key={c.id}
className="bg-white p-4 rounded-xl my-2">

{c.name}

</div>

))
}


</Layout>

)

}

export default SearchResults;