
const mongoose = require('mongoose');

const AuthenticationSchema = new mongoose.Schema({
    Email: {
        type: String,
        unique:[true,"Email Must Be Unique"],
        required:[true,"Email Is Required"]

    }, 

    Password: {
        type: String,
        minlength:[8,"Password Must Be More Than Of 8 Characters"],
        required:[true,"Password Is Required"]
    
    },

    since: {
        type: Date,
        default: Date.now
      },

      Role:{
        type:String,
        enum:["Admin", "Member"],
        required:[true, "Role is Required"]

      }
});

module.exports = authentication = mongoose.model('authentication', AuthenticationSchema)