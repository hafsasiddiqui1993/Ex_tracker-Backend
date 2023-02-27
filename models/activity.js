const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Activityschema = new Schema({
    exe_ac_name: {
        type: String,
        required: true  
    },

    exe_ac_desc: {
        type: String,
        required: true  
    },

    exe_ac_type: {
        type: String,
        required: true  
    }, 

    exe_ac_dur: {
        type: String,
        required: true  
    },

   

    since: {
        type: Date,
        default: Date.now
      }


});
module.exports = activity = mongoose.model('activity', Activityschema);