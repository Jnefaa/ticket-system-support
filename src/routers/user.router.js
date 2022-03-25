const express =require("express"); 
const router =express.Router() 
const {insertUser, getUserByEmail , getUserById, } = require("../modele/user/User.model"); 
const {hashPassword,comparePassword}=require("../helpers/bycript.helpres");

const { crateAccessJWT, creatRefreshJWT } = require("../helpers/jwt.helpers");
const {userAuthorization} = require ("../middlewares/authorization.middleware");
const req = require("express/lib/request");
const res = require("express/lib/response");
const { setPasswordResetPin } = require("../modele/resetpin/ResetPin.model");
router.all('/',(req,res,next)=> { 
 //  res.json  ({message :"return form user router "}) ;
     next();
    }); 
//Get user profile router 
router.get  ("/", userAuthorization , async (req,res) => { 
    //this data from  databases 
    const _id = req.userId
    const userProf = await getUserById(_id)
 
   res.json({ user: userProf }) 
})
    //create new user router 
router.post('/',async( req,res)=>{ 
    const {name,phone,email,password} =req.body ;  

    try {
        //hash password  
        const hashedPass =  await hashPassword(password) 
        const newUsrObj ={ 
            name,
            phone,
            email,
            password :hashedPass , 
        }
        const result = await insertUser (newUsrObj)
        console.log(result);
        res.json({message: "New User Created",result})
    } catch (error) {
        console.log(error); 
        res.json({statux : "error", message:error.message}); 

    }

   
       


 

}) 

     //user sing in Route  r  
router.post("/login",async (req,res)=> { 
    const { email , password }= req.body ;

      // hash password  and compaire with the db  
      if(!email || !password) { 
         return res.json({status: "error" , message: "Invalid form submit  "})
                } 
    
       //get user with email from 
       const user = await getUserByEmail(email) 
       const passFromDb =  user && user._id ? user.password :null ; 
  if (!passFromDb) 
  return res.json({status: "error" , message: "invalid form "}) 

const result = await comparePassword(password, passFromDb)

   if(!result)  
   {
    return res.json({status: "error" , message: "Invalid email or password  "}) 

   }
   const accessJWT = await crateAccessJWT(user.email, `${user._id}`);
 const refreshJWT = await creatRefreshJWT(user.email, `${user._id}`);

console.log(result)
res.json({status:"success",message :"Login Succefffully",accessJWT,refreshJWT})
  })










  router.post("/reset-password",async (req,res)=> { 
      const {email}=req.body ; 
      const user = await getUserByEmail (email)

      if(user && user._id) { 
          // create unique pin 6 digit 
          const setPin = await setPasswordResetPin(email)
          return res.json(setPin)
      }
      res.json({status:"error",message:"if the email is exist in our database , the password reset pin will be sent shortly "}); 
  })

  
  module.exports=router ; 