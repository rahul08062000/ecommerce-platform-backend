import User from "../models/User.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser =  async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      let { name, email, password } = request.body;
      //check if email is existing
      let user = await User.findOne({ email: email });
      if (user) {
        return response.status(400).json({
          msg: "Email already exists",
        });
      }

      //encrypt password
      let salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);

      //register a new user
      user = new User({ name, email, password });
      user = await user.save();

      //create token

      let payload = {
        user: {
          id: user._id,
          name: user.name,
        },
      };
      let secretKey = process.env.JWT_SECRET_KEY;
      if (secretKey) {
        let token = jwt.sign(payload, secretKey);
        response.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .json([
            { message: "Sign in successfully 😊 👌" },
            { token: token },
          ]);
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({
        msg: error,
      });
    }
  }


export const loginUser=  async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      let { email, password } = request.body;
      //check if email is existing
      let user = await User.findOne({ email: email });
      if (!user) {
        return response.status(401).json({
          msg: "Email/password does not exist",
        });
      }
      //check if password is correct
      let isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return response.status(401).json({
          msg: "Email/Password does not match",
        });
      }

      //create token
      let payload = {
        user: {
          id: user._id,
          name: user.name,
        },
      };
      let secretKey = process.env.JWT_SECRET_KEY;
      if (secretKey) {
        let token = jwt.sign(payload, secretKey);
        response
          .cookie("token", token, {
            httpOnly: false,
            //secure: process.env.NODE_ENV === "production",
          })
          .status(200)
          .json(
            { message: "Logged in successfully", 
             token : token }
          );
      }
    } catch (error) {
      console.log(error);
      response.status(500).json({
        msg: error,
      });
    }
  }


  export const getUser=async (request, response) => {
    try {
      let requestedUser = request.headers["user"];
      console.log("this is requested user", requestedUser);
      let user = await User.findById(requestedUser.id).select('-password');
      console.log("this is user", user);
      if (!user) {
        return response.status(404).json({
          msg: "User not found",
        });
      }
      response.status(200).json({
        user: user,
      });
    } catch (error) {
      console.log(error);
      response.status(500).json({
        msg: "something went wrong",
      });
    }
  }