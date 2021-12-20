import User from '../../models/User.js'
import * as bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"


const createUser = async (req,res)=> {
  try{
    let {username,password,first_name,last_name} = req.body
    console.log(req.body)
    console.log(username)
    console.log(password)
    console.log(first_name)
    console.log(last_name)
    //validate
    if(!username || !password || !first_name || !last_name)
      return res.status(400).json({msg:"Not all fields have been entered."})

    if(password.length<5)
      return res.status(400).json({msg:"The password needs to be at least 5 characters long."})

    const existingUser = await User.findOne({username: username})

    if(existingUser)
      return res.status(400).json({msg:"An account with this username already exists."})
    
    const salt = await bcrypt.genSalt()

    const passwordHash = await bcrypt.hash(password,salt)

    const newUser = new User({
      username,
      password: passwordHash,
      first_name: first_name,
      last_name: last_name
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
    console.log(username)
    console.log(password)

    if(!username || !password)
      return res.status(400).json({msg:"Not all fields have been entered."})

    const user = await User.findOne({username: username})

    if(!user)
      return res.status("No account with this email has been registered.")
     
    const passwordIsMatch = await bcrypt.compare(password, user.password)
    if(!passwordIsMatch)
      return res.status(400).json({msg:"Invalid credentials."})

    const token = jsonwebtoken.sign({id: user._id}, process.env.JWT_SECRET)
    console.log(user)
    res.json({token,user:{id: user._id, first_name: user.first_name, last_name: user.last_name}})

  }catch(err){
    res.status(500).json({error: err.message})
  }
}
const tokenIsValid = async (req,res)=> {
  try{
    const token = req.header("x-auth-token")
    if(!token) return res.json(false)
    const verified = jsonwebtoken.verify(token,process.env.JWT_SECRET)
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

export {createUser, loginUser, getUser, tokenIsValid}