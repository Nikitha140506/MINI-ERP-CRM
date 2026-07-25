import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard";
import Customers from "../pages/Customers";
import Products from "../pages/Products";
import Sales from "../pages/Sales";
import Invoices from "../pages/Invoices";
import Warehouse from "../pages/Warehouse";
import Accounts from "../pages/Accounts";
import Reports from "../pages/Reports";
import Inventory from "../pages/Inventory";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import SearchResults from "../pages/SearchResults";
import Suppliers from "../pages/Suppliers";
import Purchases from "../pages/Purchases";

import ProtectedRoute from "../components/ProtectedRoute";


function AppRoutes(){

return(

<Routes>


{/* Default */}

<Route
path="/"
element={
<Navigate to="/login" replace/>
}
/>



{/* Public */}

<Route
path="/login"
element={<Login/>}
/>


<Route
path="/register"
element={<Register/>}
/>



{/* Dashboard */}

<Route
path="/dashboard"
element={
<ProtectedRoute
allowedRoles={[
"ADMIN",
"SALES",
"WAREHOUSE",
"ACCOUNTS"
]}
>
<Dashboard/>
</ProtectedRoute>
}
/>



{/* Customers */}

<Route
path="/customers"
element={
<ProtectedRoute
allowedRoles={[
"ADMIN",
"SALES"
]}
>
<Customers/>
</ProtectedRoute>
}
/>



{/* Products */}

<Route
path="/products"
element={
<ProtectedRoute
allowedRoles={[
"ADMIN",
"WAREHOUSE"
]}
>
<Products/>
</ProtectedRoute>
}
/>



{/* Sales */}

<Route
path="/sales"
element={
<ProtectedRoute
allowedRoles={[
"ADMIN",
"SALES"
]}
>
<Sales/>
</ProtectedRoute>
}
/>



{/* Warehouse */}

<Route
path="/warehouse"
element={
<ProtectedRoute
allowedRoles={[
"ADMIN",
"WAREHOUSE"
]}
>
<Warehouse/>
</ProtectedRoute>
}
/>



{/* Suppliers */}

<Route
path="/suppliers"
element={
<ProtectedRoute
allowedRoles={[
"ADMIN",
"WAREHOUSE"
]}
>
<Suppliers/>
</ProtectedRoute>
}
/>



{/* Purchases */}

<Route
path="/purchases"
element={
<ProtectedRoute
allowedRoles={[
"ADMIN",
"WAREHOUSE"
]}
>
<Purchases/>
</ProtectedRoute>
}
/>



{/* Invoices */}

<Route
path="/invoices"
element={
<ProtectedRoute
allowedRoles={[
"ADMIN",
"SALES",
"ACCOUNTS"
]}
>
<Invoices/>
</ProtectedRoute>
}
/>



{/* Accounts */}

<Route
path="/accounts"
element={
<ProtectedRoute
allowedRoles={[
"ADMIN",
"ACCOUNTS"
]}
>
<Accounts/>
</ProtectedRoute>
}
/>



{/* Reports */}

<Route
path="/reports"
element={
<ProtectedRoute
allowedRoles={[
"ADMIN"
]}
>
<Reports/>
</ProtectedRoute>
}
/>



{/* Inventory */}

<Route
path="/inventory"
element={
<ProtectedRoute
allowedRoles={[
"ADMIN",
"WAREHOUSE"
]}
>
<Inventory/>
</ProtectedRoute>
}
/>



{/* Search */}

<Route
path="/search"
element={
<ProtectedRoute>
<SearchResults/>
</ProtectedRoute>
}
/>



{/* Settings */}

<Route
path="/settings"
element={
<ProtectedRoute
allowedRoles={[
"ADMIN"
]}
>
<Settings/>
</ProtectedRoute>
}
/>



{/* Profile */}

<Route
path="/profile"
element={
<ProtectedRoute>
<Profile/>
</ProtectedRoute>
}
/>



{/* Invalid Route */}

<Route
path="*"
element={
<Navigate to="/login" replace/>
}
/>


</Routes>

);

}


export default AppRoutes;