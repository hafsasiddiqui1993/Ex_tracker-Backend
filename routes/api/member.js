const express = require('express');
const route = express.Router();
const {jwtSecretKey} = require ('../server/db');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express()

const {check, validationResult} = require('express-validator/check');
const Member = require('../../../models/member');

route.post('/'[
    check('m_fullname', 'Member name is required', 'Please enter with 3 or more characters').not().isEmpty(),

    check('m_dob', 'Member date of birth is required').not().isEmpty(),
    check('m_add', 'Member address is required').not().isEmpty(),
    check('m_ph', 'Member phone is required').not().isEmpty(),
    check('m_nic', 'Member CNIC is required').not().isEmpty().isLength({ max: 11 }),
	check('m_email', 'Please include a valid email').isEmail(),
	check('m_pass', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() })
    }
    const{m_fullname, m_dob, m_add, m_ph, m_nic, m_email, m_pass } = req.body;
     
    try{
        let member = await Member.findOne({m_name});
        if(member) {
            return res.status(400).json({errors: [{msg: 'Member already exists'}]})
        }
        member = new Member({
           m_fullname,
           m_dob,
		   m_add,
		   m_ph,
           m_nic,
		   m_email,
           m_pass 
        })
      const salt = await bcrypt.genSalt(10);
      member.m_pass = await bcrypt.hash(m_pass, salt);
      await member.save();

      const payload = {
        m_email: {
            id: member.id
        }
      }
     jwt.sign(payload,jwtSecretKey, {
        expiresIn: 360000
     

     }, (err, token) => {
        if (err) throw err;
        res.join({token})
     })
                

    } catch (err) {
        console.error(err.message);
		res.status(500).send('Server Error');
    }

});
app.listen(8000)

module.exports = route;