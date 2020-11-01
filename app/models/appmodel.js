const mongoose=require('mongoose')

const xSchema = new mongoose.Schema({
    email: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})




module.exports = mongoose.model('Content',xSchema)