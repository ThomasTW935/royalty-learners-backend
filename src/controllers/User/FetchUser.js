import User from "../../models/User.js";

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.user);
    res.json({
      _id: user._id,
      username: user.username,
      firstName: user.first_name,
      lastName: user.last_name,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    const formatUsers = users.map((user) => {
      const newUser = {
        _id: user._id,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
      };
      return newUser;
    });
    res.json(formatUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { getUser, getUsers };
