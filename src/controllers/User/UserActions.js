import User from '../../models/User.js'
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import {auth} from "../../middleware/auth.js"


const createUser = async (req,res)=> {
  try{
    let {username,password,passwordCheck,firstName,lastName} = req.body

    //validate
    if(!username || !password || !passwordCheck || !firstName || !lastName)
      return res.status(400).json({msg:"Not all fields have been entered."})

    if(password.length<5)
      return res.status(400).json({msg:"The password needs to be at least 5 characters long."})

    if(password !== passwordCheck)
      return res.status(400).json({msg:"Enter the same password twice for verification."})

    const existingUser = await User.findOne({username: username})

    if(existingUser)
      return res.status(400).json({msg:"An account with this username already exists."})
    
    const salt = await bcrypt.genSalt()

    const passwordHash = await bcrypt.hash(password,salt)

    const newUser = newUser({
      username,
      password: passwordHash,
      first_name: firstName,
      last_name: lastName
    })

    const savedUser = await newUser.save()

    res.json(savedUser)

  } catch(err){
    res.status(500).json({error: err.message})
  }
}
const loginUser = async (req,res)=>{
  try{

    const {username, password} = req.body

    if(!username || !password)
      return res.status(400).json({msg:"Not all fields have been entered."})

    const user = await User.findOne({username: username})

    if(!user)
      return res.status("No account wiht this email has been registered.")
     
    const passwordIsMatch = await bcrypt.compare(password, user.password)
    if(passwordIsMatch)
      return res.status(400).json({msg:"Invalid credentials."})

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

    res.json({token,user:{id: user_id, first_name: user.first_name, last_name: user.last_name}})

  }catch(err){
    res.status(500).json({error: err.message})
  }
}
const tokenIsValid = async (req,res)=> {
  try{
    const token = req.header("x-auth-token")
    if(!token) return res.json(false)
    const verified = jwt.verify(token,process.env.JWT_SECRET)
    if(!verified) return res.json(false)
    const user = await User.findById(verified.id)
    if(!user) return res.json(false)
    return res.json(true)
  }catch(err){
    res.status(500).json({error: err.message})
  }
}

const getUser = async (req,res)=> {
  const user = await User.findById(req.user)
  res.json({
    id: user._id,
    first_name: user.first_name,
    last_name: user.last_name
  })
}

export {createUser, loginUser}