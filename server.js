
const JWT = require("jsonwebtoken")
const cookieparser  = require("cookie-parser")

const MyDB = require('./db')
const authentication = require('./models/authentication')
const member = require('./models/member')
const activity = require('./models/activity')
const adminauth = require('./models/adminauth')

// import authentication from '../../models/authentication';

// app.use(express.json());

MyDB.main()
const SecKey = "Hello"



const express = require('express')

const app = express()
app.use(express.json())

app.use(cookieparser())
app.get("/",(req,res) =>{
    console.log(req.cookies)
    console.log(req.headers["cookie"])
    res.send("Allowed")
})




// const authentication = require('./models/authentication')

app.post("/auth",async(req,res)=>{
    const{Email, Password, Role} = req.body
    console.log(req.body) 

    try{ 

        const Result = await authentication.create({Email:Email, Password:Password,  Role:Role}) 
        const ob = {
            id:Result['_id'],
            role:Result["Role"]
        } 

        const Token = JWT.sign(ob,SecKey)
        res.cookie("Tokenization", Token)
        res.send("Role Added")
        res.send(Result)

    } catch(e){
       res.status(400).send(e.message) 
    }


})

app.post("/exercise_activity",async(req,res)=>{
    const{exe_ac_name, exe_ac_desc, exe_ac_type,exe_ac_dur} =req.body
    console.log(req.body)
    try{
        const Result = await activity.create({exe_ac_name:exe_ac_name, exe_ac_desc:exe_ac_desc, exe_ac_type:exe_ac_type,exe_ac_dur:exe_ac_dur})
        const ob = {
            id:Result['_id'],
            exe_ac_type:['Bicycle', 'Swim', 'Run', 'Hike', 'Walk'],
            exe_ac_dur:['Four Days', '8 Days', 'Three Weeks', 'One Month']
            
        }

        const Token = JWT.sign(ob,SecKey)
        res.cookie("Tokenization", Token)
        res.send("Activity Added")
        res.send(Result)
    } catch(e){
        res.status(400).send(e.message)
    }
})

app.post("/register",async(req,res)=>{
    const{m_fullname, m_dob, m_add,m_ph,m_nic,m_email,m_pass} =req.body
    console.log(req.body)
    try{
        const Result = await member.create({m_fullname:m_fullname, m_dob:m_dob, m_add:m_add,m_ph:m_ph,m_nic:m_nic,m_email:m_email,m_pass:m_pass})
        const ob = {
            id:Result['_id'],
         
            
        }

        const Token = JWT.sign(ob,SecKey)
        res.cookie("Tokenization", Token)
        res.send("Member Registered!")
        res.send(Result)
    } catch(e){
        res.status(400).send(e.message)
    }
})


app.post("/memberauth",async(req,res)=>{
 const{m_email,m_pass} = req.body
 const Result = await member.findOne({m_email:m_email, m_pass:m_pass})

if(Result == null){
    res.send("Only Members are Allowed!")
} else {
    const ob = {
        id:Result["_id"],
        role:Result["Role"]
    }
    const Token = JWT.sign(ob,SecKey)
    res.cookie("Tokenization", Token)
    res.send("Identified")
}

})
app.post("/adminauth",async(req,res)=>{
    const{Email,Password} = req.body
    const Result = await authentication.findOne({Email:Email, Password:Password})
   
   if(Result == null){
       res.send("Only Admin Allowed!")
   } else {
       const ob = {
           id:Result["63f9d9a3ff20e4b150b72836"],
           
           role:Result["Role"]
       }
       const Token = JWT.sign(ob,SecKey)
       res.cookie("Tokenization", Token)
       res.send("Identified")
   }
   
})   


app.post("/logout",(req,res)=>{
    res.cookie("Tokenization", null) 
    res.send("Logout")
}) 


app.get("/Admin",(req,res)=>{
    res.send("Welcome Admin")
})

app.get("/exercise_activity",(req,res)=>{
    res.send("Exercise Activity Display")
})



const PORT = 8000
// console.log(PORT)
app.listen(PORT, console.log(`server running in`));
