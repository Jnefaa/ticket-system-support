const {UserSchema} =require ('./User.schema')


const insertUser = userObj => { 
    return new Promise ((reslove , reject) => { 
        UserSchema(userObj)
        .save()
        .then(data => reslove(data))
        .catch((error)=> reject(error)); 
    })
  

}; 

const getUserByEmail = email =>{
    return new Promise((reslove,reject)=> { 

        try {
            if(!email) return false 
            UserSchema.findOne({email},(error,data) => { 
              if(error) { 
                  reject(error)
              }
              reslove(data)
            })
            
        } catch (error) {
            
        }
       
    })
  
 }
 const storeUserRefresfhJWT = (_id , token )=> {
    return new Promise ((reslove,reject)=> { 


        try {
            UserSchema.findOneAndUpdate (
                {_id}, 
                {$set:{"refreshJWT.token":token, 
               "refreshJWT.addedAt":Date.now()}},
               {new :true},
               
               
            )
            .then ((data)=> reslove(data))
            .catch((error)=>{
                reject(error)
                console.log(error)
                
            });
        } catch (error) {
            reject(error); 
            console.log(error)
        }
     })
    }


    const getUserById = (_id) => {
        return new Promise((resolve, reject) => {
          if (!_id) return false;
      
          try {
            UserSchema.findOne({ _id }, (error, data) => {
              if (error) {
                console.log(error);
                reject(error);
              }
              resolve(data);
            });
          } catch (error) {
            reject(error);
          }
        });
      };

     
module.exports ={ 
    insertUser,
    getUserByEmail,
    getUserById,
    storeUserRefresfhJWT,
}

/* 
 {  
     "name" :"nefaa", 
     "phone" :"97212989",
     "email"  :"nefaa1999@gmail.com",
     "password"  :"azertyui",
 }
*/ 