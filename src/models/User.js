import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true, minlength:5},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
})

const User = mongoose.model("user", UserSchema)

export default User