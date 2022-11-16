var jwt = require('jsonwebtoken');
const {storeUserRefresfhJWT} = require ("../modele/user/User.model")
const {setJWT,getJWT} = require ("./redis.helpers")
const crateAccessJWT = async (email,_id) => {

      try {
        
       

        const accessJWT =  await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, 
        {expiresIn: "15m",}); //15m
         await setJWT(accessJWT,_id)
         return Promise.resolve(accessJWT);
    
         
 


      } catch (error) {
      //  return null ; 
       return Promise.reject(error);

      }
    }

const  creatRefreshJWT = async (email, _id)=> { 
    

  try {
    const refreshJWT = jwt.sign({email} ,process.env.JWT_REFRESH_SECRET ,
      {expiresIn:'3d'});
   
  await  storeUserRefresfhJWT (_id ,refreshJWT)
  return Promise.resolve(refreshJWT)
  } catch (error) {
    return Promise.reject(error)
  }
    
  }
const verifyAccessJWT = UserJWT => { 
  try {
    return Promise.resolve(jwt.verify (UserJWT, process.env.JWT_ACCESS_SECRET )) 
     
   } catch (error) {
      //return null ;  
   // return Promise.reject(error)
   console.log(error);
   res.status(403).json({ message: "Token is not valid" });
  }
}

const verifyREFRESHJWT = UserJWT => { 
  

  try {
    return Promise.resolve(jwt.verify (UserJWT, process.env.JWT_REFRESH_SECRET )) 
  } catch (error) {
    return Promise.reject(error)
  }
}

module.exports ={crateAccessJWT,
                 creatRefreshJWT, 
                 verifyAccessJWT ,
                 verifyREFRESHJWT,};
