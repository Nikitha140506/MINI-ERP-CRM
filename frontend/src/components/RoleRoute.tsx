import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";


interface Props {

    children: ReactElement;

    allowedRoles: string[];

}



function RoleRoute({

    children,

    allowedRoles

}: Props) {


    const user = JSON.parse(

        localStorage.getItem("user") || "{}"

    );


    if (!allowedRoles.includes(user.role)) {

        return <Navigate to="/dashboard" replace />;

    }


    return children;

}


export default RoleRoute;