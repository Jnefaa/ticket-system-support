const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true,
  },
 
  phone: {
    type: Number,
    maxlength: 11,
    required: true,
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 100,
    required: true,
  },
  refreshJWT: { 
    token : {
      type: String, 
      maxlength:700,
      default:""
    }, 
    addedAt :{ 
      type:Date, 
      required :true, 
      default: Date.now()
    }
  } ,
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = {
  UserSchema: mongoose.model("User", UserSchema),
};