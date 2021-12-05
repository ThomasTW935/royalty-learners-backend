import express from "express";

import {createUser} from "../../controllers/User/UserActions.js"

const users = express.Router();

users.get("/", (req,res) => {});
users.post("/", createUser);

export default users;
