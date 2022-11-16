const {verifyAccessJWT} =require ('../helpers/jwt.helpers')
const {getJWT,deleteJWT} = require ('../helpers/redis.helpers')


const userAuthorization = async (req,res,next) => { 
    const {authorization} = req.headers ; 
    
        //1 verfy if jwt is valid
        const decoded = await verifyAccessJWT(authorization) ; 
        console.log (decoded) ;  
        if (decoded.email){ 
          const userId = await getJWT (authorization)
          console.log(userId)
        
        if(!userId) { 
          return  res.status(403).json({message:"Forbidden"})

        }
         req.userId = userId
       return next() 
     
    }  
    deleteJWT(authorization)
return res.status(403).json({message:"Forbidden"}) 
}
const HdeskAuthorization = async (req,res,next) => { 
  const {authorization} = req.headers ; 
  
      //1 verfy if jwt is valid
      const decoded = await verifyAccessJWT(authorization) ; 
      console.log (decoded) ;  
      if (decoded.email){ 
        const helpdeskId = await getJWT (authorization)
        console.log(helpdeskId)
      
      if (!helpdeskId) { 
        return  res.status(403).json({message:"Forbidden"})
      }


       req.helpdeskId = helpdeskId
     return next() 
  
    }
  deleteJWT(authorization)
return res.status(403).json({message:"Forbidden"}) 
}

module.exports ={ 
    userAuthorization, HdeskAuthorization
}