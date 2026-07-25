import {Router} from "express";

import {
    getAccounts
}
from "../controllers/accounts.controller";


import authMiddleware 
from "../middleware/auth.middleware";


const router = Router();



router.get(
"/",
authMiddleware,
getAccounts
);



export default router;