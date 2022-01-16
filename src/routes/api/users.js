import express from "express";
import {auth} from "../../middleware/auth.js"


import {createUser, loginUser, tokenIsValid, updateUser} from "../../controllers/User/UserActions.js"
import {getUser, getUsers} from "../../controllers/User/FetchUser.js"

const users = express.Router();

users.post("/register", createUser);
users.post("/login", loginUser);
users.put('/:id', updateUser);
users.post("/tokenIsValid", tokenIsValid);
// users.delete("/delete", createUser);
users.post("/", getUser);
users.get("/all", getUsers);

export default users;
