import { Navigate } from "react-router-dom";


interface Props {

    children: JSX.Element;

    allowedRoles:string[];

}



function RoleRoute({

    children,

    allowedRoles

}:Props){


    const user = JSON.parse(

        localStorage.getItem("user") || "{}"

    );


    if(!allowedRoles.includes(user.role)){

        return <Navigate to="/dashboard" replace />;

    }


    return children;


}


export default RoleRoute;