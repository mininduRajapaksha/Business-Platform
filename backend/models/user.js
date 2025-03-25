const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,  
  },
  lastName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  homeAddress:{
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  role: {
    type: String,
    enum: ['customer', 'businessman'],
    default: 'customer'
  },
  password:{
        type: String,
        required: true,
    },
  
},{ timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('User', userSchema);