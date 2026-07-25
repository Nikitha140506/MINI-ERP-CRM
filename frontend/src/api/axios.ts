import axios from "axios";


const API = axios.create({

baseURL: "https://mini-erp-backend-urjr.onrender.com/api"

});


API.interceptors.request.use(

(config)=>{

    const token = localStorage.getItem("token");


    console.log("Sending token:", token);


    if(token){

        config.headers.Authorization =
        `Bearer ${token}`;

    }


    return config;

},

(error)=>{

    return Promise.reject(error);

}

);


export default API;