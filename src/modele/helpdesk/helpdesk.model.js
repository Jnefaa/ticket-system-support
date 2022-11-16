
const {HelpdeskSchema} =require ('./Helpdesk.schema')


const getHelpdeskByEmail = email =>{
    return new Promise((reslove,reject)=> { 

        try {
            if(!email) return false 
            HelpdeskSchema.findOne({email},(error,data) => { 
              if(error) { 
                  reject(error)
              }
              reslove(data)
            })
            
        } catch (error) {
            
        }
       
    })
  
 }

 const getHelpDeskById = (_id) => {
    return new Promise((resolve, reject) => {
      if (!_id) return false;
  
      try {
        HelpdeskSchema.findOne({ _id }, (error, data) => {
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

 const storeUserRefresfhJWT = (_id , token )=> {
    return new Promise ((reslove,reject)=> { 


        try {
            HelpdeskSchema.findOneAndUpdate (
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
    const insertHelpDesk = helpD => { 
        return new Promise ((reslove , reject) => { 
            HelpdeskSchema(helpD)
            .save()
            .then(data => reslove(data))
            .catch((error)=> reject(error)); 
        })
      
    
    }; 
 module.exports ={ 
    getHelpdeskByEmail ,storeUserRefresfhJWT  ,insertHelpDesk ,getHelpDeskById,
}
