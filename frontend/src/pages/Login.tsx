import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../api/axios";



function Login(){


    const navigate = useNavigate();


    const [showPassword,setShowPassword] = useState(false);


    const [loading,setLoading] = useState(false);



    const [form,setForm] = useState({

        email:"",
        password:""

    });






    const login = async(e:any)=>{


        e.preventDefault();



        try{


            setLoading(true);



            const res = await API.post(

                "/auth/login",

                form

            );

console.log("LOGIN RESPONSE:", res.data);

            localStorage.setItem(

                "token",

                res.data.token

            );



            localStorage.setItem(

                "user",

                JSON.stringify(res.data.user)

            );



            toast.success(
                "Login Successful"
            );



            navigate("/dashboard");



        }


        catch(error:any){


            toast.error(

                error.response?.data?.message ||

                "Invalid credentials"

            );


        }


        finally{


            setLoading(false);


        }


    };






    return(



    <div className="
    min-h-screen
    flex
    items-center
    justify-center
    bg-gradient-to-br
    from-slate-900
    via-blue-900
    to-slate-900
    ">






        <div className="
        bg-white
        w-full
        max-w-md
        rounded-3xl
        shadow-2xl
        p-8
        ">





            {/* Logo */}



            <div className="
            text-center
            mb-8
            ">



                <div className="
                mx-auto
                w-16
                h-16
                rounded-2xl
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                text-3xl
                font-bold
                ">

                    E

                </div>



                <h1 className="
                text-3xl
                font-bold
                mt-4
                text-gray-800
                ">

                    ERP Pro

                </h1>


                <p className="
                text-gray-500
                ">

                    Login to your dashboard

                </p>



            </div>








            <form

            onSubmit={login}

            className="
            space-y-5
            ">





            {/* Email */}



            <div className="
            relative
            ">


            <FaEnvelope className="
            absolute
            left-4
            top-4
            text-gray-400
            "/>



            <input


            type="email"


            placeholder="Email"


            className="
            w-full
            border
            rounded-xl
            py-3
            pl-12
            focus:ring-2
            focus:ring-blue-500
            outline-none
            "


            value={form.email}


            onChange={

            e=>setForm({

                ...form,

                email:e.target.value

            })

            }


            required


            />


            </div>








            {/* Password */}




            <div className="
            relative
            ">


            <FaLock className="
            absolute
            left-4
            top-4
            text-gray-400
            "/>




            <input


            type={
                showPassword
                ?
                "text"
                :
                "password"
            }



            placeholder="Password"



            className="
            w-full
            border
            rounded-xl
            py-3
            pl-12
            pr-12
            focus:ring-2
            focus:ring-blue-500
            outline-none
            "



            value={form.password}



            onChange={

            e=>setForm({

                ...form,

                password:e.target.value

            })

            }


            required



            />





            <button


            type="button"


            onClick={()=>setShowPassword(!showPassword)}


            className="
            absolute
            right-4
            top-3
            text-gray-500
            "


            >


            {

            showPassword

            ?

            <FaEyeSlash/>

            :

            <FaEye/>

            }



            </button>



            </div>








            <button


            className="
            w-full
            bg-blue-600
            text-white
            py-3
            rounded-xl
            font-semibold
            hover:bg-blue-700
            transition
            "


            >


            {

            loading

            ?

            "Logging in..."

            :

            "Login"


            }



            </button>






            </form>






        </div>





    </div>



    );


}



export default Login;