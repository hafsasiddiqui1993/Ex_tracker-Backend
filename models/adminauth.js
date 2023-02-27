
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    a_email: {
        type: String,
        unique:[true,"Email Must Be Unique"],
        required:[true,"Email Is Required"]

    }, 

    a_pass: {
        type: String,
        minlength:[8,"Password Must Be More Than Of 8 Characters"],
        required:[true,"Password Is Required"]
    
    },

    since: {
        type: Date,
        default: Date.now
      },

    //   Role:{
    //     type:String,
    //     enum:["Admin"],

    //   }
});

module.exports = adminauth = mongoose.model('adminauth', AdminSchema)