import {Schema, model} from 'mongoose'

const SubjectSchema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  department: {type: String, required: true}

}, {timestamps:true})

module.exports = model('Subject', SubjectSchema)