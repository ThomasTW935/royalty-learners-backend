import User from '../../models/User.js'

const getUser = async (req,res)=> {
  try{
    const user = await User.findById(req.user)
    console.log(req.user)
    res.json({
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name
    })
  }catch(err){
    res.status(500).json({error: err.message})
  }
}

const getUsers = async (req,res)=> {
  try{
    const users = await User.find()
    console.log(users)
    res.json(users)
  }catch(err){
    res.status(500).json({error: err.message})
  }
}

export {getUser, getUsers}