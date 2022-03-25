var jwt = require('jsonwebtoken');
const {storeUserRefresfhJWT} = require ("../modele/user/User.model")
const {setJWT,getJWT,} = require ("./redis.helpers")
const crateAccessJWT = async (email,_id) => {

      try {
        
       

        const accessJWT =  await jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, 
        {expiresIn: "1m",}); //15m
         await setJWT(accessJWT,_id)
         return Promise.resolve(accessJWT);
    

 


      } catch (error) {
        return Promise.reject(error);

      }
    }

const  creatRefreshJWT = async (email, _id)=> { 
    

  try {
    const refreshJWT = jwt.sign({email} ,process.env.JWT_REFRESH_SECRET ,
      {expiresIn:'30d'});
   
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
    return Promise.reject(error)
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
