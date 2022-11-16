const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HelpdeskSchema = new Schema({
 
  name: {
    type: String,
    maxlength: 50,
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
            }
});

module.exports = {
    HelpdeskSchema: mongoose.model("HelpDesk", HelpdeskSchema),
};