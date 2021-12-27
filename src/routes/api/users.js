import express from "express";
import {auth} from "../../middleware/auth.js"


import {createUser, loginUser, getUser, tokenIsValid} from "../../controllers/User/UserActions.js"

const users = express.Router();

users.post("/register", createUser);
users.post("/login", loginUser);
users.post("/tokenIsValid", tokenIsValid);
// users.delete("/delete", createUser);
users.get("/",auth, getUser);

export default users;
