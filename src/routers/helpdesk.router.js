const express =require("express"); 
const router =express.Router()  
const  {getHelpdeskByEmail ,insertHelpDesk ,storeUserRefresfhJWT,getHelpDeskById} = require ('../modele/helpdesk/helpdesk.model')
const {comparePassword,hashPassword}=require("../helpers/bycript.helpres");
const { crateAccessJWT, creatRefreshJWT } = require("../helpers/jwt.helpers");
const {HdeskAuthorization} = require ("../middlewares/authorization.middleware");

router.all('/',(req,res,next)=> { 
        next();
       });

       router.get  ("/" , HdeskAuthorization , async (req,res) => { 
        //this data from  databases 
        const _id = req.helpdeskId
        const HdeskProf = await getHelpDeskById(_id)
       res.json({ helpdesk: HdeskProf }) 
    })
       router.post("/login",async (req,res)=> { 
        const { email , password }= req.body ;
    
          if(!email || !password) { 
             return res.json({status: "error" , message: "Invalid form submit  "})
                    } 
        
           //get user with email from 
           const Hdesk = await getHelpdeskByEmail(email) 
           
           const passFromDb =  Hdesk && Hdesk._id ? Hdesk.password :null ; 
          
      if (!passFromDb) 
      return res.json({status: "error" , message: "invalid form "})
    
    const result = await comparePassword(password, passFromDb)
    
       if(!result)  
       {
        return res.json({status: "error" , message: "Invalid email or password  "}) 
    
       }
       const accessJWT = await crateAccessJWT(Hdesk.email, `${Hdesk._id}`);
     const refreshJWT = await creatRefreshJWT(Hdesk.email, `${Hdesk._id}`);
    
    console.log(result)
    res.json({status:"success",message :"Login Succefffully",accessJWT,refreshJWT})
      })









      router.post('/' , async( req,res)=>{ 
        const {name,email ,password} =req.body ;  
    
        try {
            //hash password  
            const hashedPass =  await hashPassword(password) 

            const newhelpDesk ={ 
               
                name,
                email,
                password :hashedPass 
            }
            const result = await insertHelpDesk (newhelpDesk)
            console.log(result);
    
            res.json({message: "New User Created",result})
        } catch (error) {
            console.log(error); 
            res.json({statux : "error", message:error.message}); 
    
        }
       
    }) 


















      module.exports = router;