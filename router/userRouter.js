import express from "express";
import { body } from "express-validator";
import TokenVerifier from "../middlewares/TokenVerifier.js";
import { registerUser, loginUser, getUser } from "../controllers/userController.js";
const userRouter = express.Router();

//logic
/*
    usage :Register a user
    url :http://localhost:5000/users/register
    method :POST
    body :{
        name :<NAME>
        email :<EMAIL>
        password :<PASSWORD>
    }
    Access:public
*/

userRouter.post(
  "/register",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").not().isEmpty().withMessage("Email is required"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
registerUser
);

/*
    usage:login a user
    url:http://localhost:5000/users/login
    method:POST
    fields:email,password
    Access:public

*/

userRouter.post(
  "/login",
  [
    body("email").not().isEmpty().withMessage("Email is required"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
loginUser
);

/*
    usage:Get user information
    url:http://localhost:5000/users/me
    method:GET
    fields:no fields
    Access:private

*/

userRouter.get("/me", TokenVerifier, getUser);

export default userRouter;
