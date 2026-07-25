import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";


function Register(){

    const navigate = useNavigate();


    const [form,setForm] = useState({

        name:"",
        email:"",
        password:""

    });


    const handleChange = (
        e:React.ChangeEvent<HTMLInputElement>
    )=>{

        setForm({

            ...form,

            [e.target.name]:e.target.value

        });

    };



    const handleSubmit = async(
        e:React.FormEvent
    )=>{

        e.preventDefault();


        try{

            const response = await API.post(
                "/auth/register",
                form
            );


            alert(response.data.message);


            navigate("/");


        }catch(error:any){

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );

        }

    };



    return(

        <div>

            <h2>
                Register
            </h2>


            <form onSubmit={handleSubmit}>


                <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                />


                <br/>


                <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                />


                <br/>


                <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                />


                <br/>


                <button>
                    Register
                </button>


            </form>


        </div>

    );

}


export default Register;