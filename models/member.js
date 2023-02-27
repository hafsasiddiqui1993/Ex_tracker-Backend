const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Memberschema = new Schema({
    m_fullname: {
        type: String,
        required: true
    },
    m_dob: {
        type: String,
        required: true  
    },
    m_add: {
        type: String,
        required: true  
    },

    m_ph: {
        type: String,
        required: true  
    },
    m_nic: {
        type: String,
        required: true   
    },
    m_email: {
        type: String,
        required: true   
    },
    m_pass: {
        type: String,
        required: true   
    },

    since: {
        type: Date,
        default: Date.now
      }
    
});


module.exports = member = mongoose.model('member', Memberschema);

// const member = new mongoose.model('member', MemberSchema)
// module.exports = {
//     collection1: member
// };