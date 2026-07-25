import { Router } from "express";


import {

createProductController,

getAllProductsController,

getProductByIdController,

updateProductController,

deleteProductController


}

from "../controllers/product.controller";


import authMiddleware from "../middleware/auth.middleware";

import { authorizeRoles } from "../middleware/role.middleware";



const router = Router();




// CREATE PRODUCT
// ADMIN + WAREHOUSE
router.post(
"/",
authMiddleware,
authorizeRoles("ADMIN","WAREHOUSE"),
createProductController
);




// GET ALL PRODUCTS
// ADMIN + SALES + WAREHOUSE
router.get(
"/",
authMiddleware,
authorizeRoles(
"ADMIN",
"SALES",
"WAREHOUSE"
),
getAllProductsController
);




// GET PRODUCT BY ID
// ADMIN + SALES + WAREHOUSE
router.get(
"/:id",
authMiddleware,
authorizeRoles(
"ADMIN",
"SALES",
"WAREHOUSE"
),
getProductByIdController
);




// UPDATE PRODUCT
// ADMIN + WAREHOUSE
router.put(
"/:id",
authMiddleware,
authorizeRoles("ADMIN","WAREHOUSE"),
updateProductController
);




// DELETE PRODUCT
// ONLY ADMIN
router.delete(
"/:id",
authMiddleware,
authorizeRoles("ADMIN"),
deleteProductController
);



export default router;