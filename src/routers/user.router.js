const express =require("express"); 
const router =express.Router() 
const {insertUser, getUserByEmail , getUserById,updatePassword, storeUserRefresfhJWT,verifyuser, } = require("../modele/user/User.model"); 
const {hashPassword,comparePassword}=require("../helpers/bycript.helpres");

const { crateAccessJWT, creatRefreshJWT } = require("../helpers/jwt.helpers");
const {userAuthorization} = require ("../middlewares/authorization.middleware");
const {emailProcesser,sendsuccessemail,SendPinToUser} = require ("../helpers/email.helper")
const { setPasswordResetPin, getEmailandPin,deletepin, } = require("../modele/resetpin/ResetPin.model");
const { resetPassReqValidation, updatePassValidation,NewUserValidation } = require("../middlewares/formValidationform.middlewares");
const res = require("express/lib/response");
const { deleteJWT } = require("../helpers/redis.helpers");
const urlverification  =  "http://localhost:3000/verification/"


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

//verify  user after is sign up 
router.patch  ("/verify" , async (req,res) => { 

    try {
          //this data from  databases 
    const { _id , email} = req.body
    const result  = await verifyuser(_id,email)
     console.log(result)
    if(result && result._id)  { 
      return   res.json({status: 'success ', message : "You account has been activated ,  you may sign in now "})
    }

    } catch (error) {
        return   res.json({status: 'error  ', message : "Invalid request "})


    }
  
})





    //create new user router 
router.post('/', NewUserValidation , async( req,res)=>{ 
    const {name,phone,email,password} =req.body ;  

    try {
        //hash password  
        const hashedPass =  await hashPassword(password) 
        const newUsrObj ={ 
            name,
            phone,
            email,
            password : hashedPass , 
        }
        const result = await insertUser (newUsrObj)
        console.log(result);
        //send the confirmation  email  to user  

        await emailProcesser ({
            email,
           
            type:"new_user_confirmation" ,
            verificationLink : urlverification + result._id +'/' + email ,
        })







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
       if (!user.isVerified) { 
        return res.json({status: "error" , message: " Your account has not been verified  . please check your email  and  verify  your  account  before able to  login   "}) 

       } 
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










  router.post("/reset-password", resetPassReqValidation, async (req,res)=> { 
      const {email}=req.body ; 
      const user = await getUserByEmail (email)

      if(user && user._id) { 
          // create unique pin 6 digit 
          const setPin = await setPasswordResetPin(email)


          SendPinToUser (email,setPin.pin)
          /*await emailProcesser ({email,
             pin : setPin.pin,
             type:"request-new-pass"
            })
           */
           return res.json({
                status: "success",
                message:
                    "If the email is exist in our database, the password reset pin will be sent shortly.",
            });
          
      }
      res.json({status:"error",message:"Sorry  we don't  Have your account  "}); 
  })

  router.patch("/reset-password",updatePassValidation ,async (req,res)=> { 
      const {email,pin,newpassword}=req.body 
      const getpin = await getEmailandPin (email,pin)

      if (getpin._id){
          const dbDate = getpin.addedAt; 
          const expiresIn = 1 ; 
          let expDate = dbDate.setDate(dbDate.getDate()+expiresIn)
           const today = new Date () ; 

           if(today>expDate) { 
               return res.json ({status: "error" , message :"Invalid or expired pin , Check again "})
           }
           console.log(newpassword) 
           //hash new password 
           const hashedPass = await hashPassword(newpassword)
           const user = await updatePassword(email,hashedPass);
           if(user._id) { 
               //send email notification to the user 
               await sendsuccessemail (email);
                //delete pin 
                deletepin(email,pin)
               
               res.json({ status: "success" , message: "Your Password has been updated "})
           }
         //  res.json({status: "error" , message :"Unable to update your password , please try again later "})

      }
   }) 
  
   router.delete("/logout",userAuthorization , async (req,res)=> { 
     

     const {authorization} = req.headers
     //from database 
     const _id = req.userId 
     //delete accessJWT from redis data bases 
     deleteJWT(authorization)

     // delete refreshjwt from mongodb  
     const result = await storeUserRefresfhJWT(_id ,"")
   
      
     console.log(result);
     if (result._id){ 
         return res.json({status: 'success', message:"Loged out successfully"})
     }
     res.json({status: 'error', message:"Unable to logg Out , please try again later "})

   })
  module.exports=router ; 