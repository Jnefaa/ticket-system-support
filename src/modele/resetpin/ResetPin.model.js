const { randomPinNumber } = require('../../utils/RandomGenrator');
const {ResetPinSchema} =require ('./ResetPin.schema')


const setPasswordResetPin = async (email) => { 
    const pinlength = 6 ; 

const randPin = await randomPinNumber(pinlength)
    //random 6 digit 
    const resetObj = { 
        email,
        pin:randPin,
    }
    //console.log('Si el pin  ' ,randPin)
    return new Promise ((reslove , reject) => { 
        ResetPinSchema(resetObj)
        .save()
        .then(data => reslove(data))
        .catch((error)=> reject(error)); 
    })
  

}; 


const getEmailandPin =(email,pin)=> { 
    return new Promise ((reslove,reject)=> { 
            
        try { 
            ResetPinSchema.findOne({email,pin},(error,data) => { 

                if(error){ 
                    console.log(error); 
                    reslove(false); 
                }
                reslove(data)
            })
        
        } catch (error) {
            reject(error)
            console.log("error")
        }

    })
    
}



const deletepin =(email,pin)=> { 
            
        try { 
            ResetPinSchema.findOneAndDelete({email,pin},(error,data) => { 

                if(error){ 
                    console.log(error); 
                
                }
              
            })
        
        } catch (error) {
            
            console.log("error")
        }

    
    
}

     
module.exports ={ 
    setPasswordResetPin,
    getEmailandPin,
    deletepin,
    
}


/* 
 {  
     "name" :"nefaa", 
     "phone" :"97212989",
     "email"  :"nefaa1999@gmail.com",
     "password"  :"azertyui",
 }
*/ 