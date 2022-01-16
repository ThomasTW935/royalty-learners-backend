import User from "../../models/User.js";
import * as bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

const createUser = async (req, res) => {
  try {
    let { username, password, first_name, last_name } = req.body;
    console.log(req.body);
    //validate
    if (!username || !password || !first_name || !last_name)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });

    const existingUser = await User.findOne({ username: username });

    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this username already exists." });

    const newUser = new User({
      username,
      password,
      first_name,
      last_name,
    });

    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const updateUser = async (req, res) => {
  const { username, password, first_name, last_name } = req.body;
  const { id } = req.params;
  console.log("UPDATE")
  console.log(req.body)
  console.log(id)
  try {
    let { username, password, first_name, last_name } = req.body;
    console.log(req.body);
    //validate
    if (!username || !password || !first_name || !last_name)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });

    const existingUser = await User.findOne({ username: username });

    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this username already exists." });

    const editUser = {
      username,
      password,
      first_name,
      last_name,
    };

    await User.updateOne({ _id: id }, editUser);
    res
      .status(200)
      .json({ message: "User edited successfully"});
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong when editing post" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ username: username });

    if (!user)
      return res.status("No account with this email has been registered.");

    const passwordIsMatch = user.password === password;

    if (!passwordIsMatch)
      return res.status(400).json({ msg: "Invalid credentials." });

    const token = "token123";
    res.json({
      token,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const tokenIsValid = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);
    const verified = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { createUser, loginUser, tokenIsValid, updateUser };
