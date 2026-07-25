import { useEffect, useState } from "react";
import API from "../api/axios";


function Profile(){

    const [user,setUser] = useState<any>(null);

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");


    useEffect(()=>{

        loadProfile();

    },[]);



    const loadProfile = async()=>{

        try{

            const response = await API.get("/users/profile");

  console.log("PROFILE RESPONSE:", response.data);


setUser(response.data.user);

setName(response.data.user?.name || "");

setEmail(response.data.user?.email || "");

        }
        catch(error){

            console.log(error);

        }

    };



    const updateProfile = async()=>{

        try{

            await API.put("/users/profile",{

                name,
                email

            });


            alert("Profile Updated Successfully");


            loadProfile();

        }
        catch(error){

            console.log(error);

        }

    };



    if(!user){

        return(
            <div className="p-6">
                Loading Profile...
            </div>
        );

    }



    return(

        <div className="p-6">


            <h1 className="text-3xl font-bold mb-6">
                User Profile
            </h1>



            <div className="bg-white rounded-xl shadow-lg p-6 max-w-xl">


                {/* Avatar */}

                <div className="flex items-center gap-4 mb-6">


                    <div className="w-20 h-20 rounded-full bg-purple-600 text-white flex items-center justify-center text-3xl font-bold">

                        {user.name.charAt(0)}

                    </div>


                    <div>

                        <h2 className="text-xl font-bold">
                            {user.name}
                        </h2>


                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">

                            {user.role}

                        </span>

                    </div>


                </div>



                {/* Name */}

                <label className="font-semibold">
                    Name
                </label>

                <input

                    className="border p-3 w-full rounded-lg mb-4"

                    value={name}

                    onChange={(e)=>setName(e.target.value)}

                />



                {/* Email */}

                <label className="font-semibold">
                    Email
                </label>


                <input

                    className="border p-3 w-full rounded-lg mb-5"

                    value={email}

                    onChange={(e)=>setEmail(e.target.value)}

                />



                <button

                onClick={updateProfile}

                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"

                >

                    Update Profile

                </button>


            </div>


        </div>

    );

}


export default Profile;