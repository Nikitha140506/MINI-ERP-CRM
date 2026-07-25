import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";


interface ThemeContextType {

    dark:boolean;

    setDark:(value:boolean)=>void;

}


const ThemeContext = createContext<ThemeContextType | null>(null);



export function ThemeProvider(
{
children
}:{
children:React.ReactNode
}){


const [dark,setDark]=useState(()=>{


const savedTheme =
localStorage.getItem("theme");


return savedTheme === "dark";


});





useEffect(()=>{


if(dark){

document.documentElement.classList.add("dark");

localStorage.setItem(
"theme",
"dark"
);


}
else{


document.documentElement.classList.remove("dark");

localStorage.setItem(
"theme",
"light"
);


}


},[dark]);





return(

<ThemeContext.Provider

value={{
dark,
setDark
}}

>

{children}

</ThemeContext.Provider>


);


}





export function useTheme(){


const context =
useContext(ThemeContext);



if(!context){

throw new Error(
"useTheme must be used inside ThemeProvider"
);

}


return context;


}