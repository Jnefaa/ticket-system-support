const express = require ("express")
const router = express.Router()
const {verifyREFRESHJWT, crateAccessJWT} = require("../helpers/jwt.helpers")
const { getUserByEmail } = require("../modele/user/User.model")
router.get("/", async (req,res,next)=> { 
    const {authorization}=req.headers
    //1 make sure token is valid
    const decoded = await verifyREFRESHJWT (authorization)
    
     if (decoded.email){ 

        const userProf = await getUserByEmail (decoded.email); 
        if(userProf._id) { 
           // res.status(403).json({message : userProf})
            let tokenEXP = userProf.refreshJWT.addedAt ;
            tokenEXP.setDate( 
                tokenEXP.getDate()+ +process.env.JWT_REFRESH_EXP_DAY
            )
           // console.log(new Date (tokenEXP)); 
           const today = new Date()
           if(tokenEXP < today){ 
            res.status(403).json({message : "Forbiden"})

           }
           const accessJWT = await crateAccessJWT(`${decoded.email}`, `${userProf._id}`)
           res.json({ status:"Success", accessJWT})
        }

     }

})
module.exports =router