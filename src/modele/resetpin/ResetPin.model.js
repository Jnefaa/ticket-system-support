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
    return new Promise ((reslove , reject) => { 
        ResetPinSchema(resetObj)
        .save()
        .then(data => reslove(data))
        .catch((error)=> reject(error)); 
    })
  

}; 



     
module.exports ={ 
    setPasswordResetPin,
    
}

/* 
 {  
     "name" :"nefaa", 
     "phone" :"97212989",
     "email"  :"nefaa1999@gmail.com",
     "password"  :"azertyui",
 }
*/ 