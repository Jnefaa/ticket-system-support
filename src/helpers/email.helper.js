const nodemailer = require ("nodemailer");
const { getEmailandPin } = require("../modele/resetpin/ResetPin.model");


//parameters of the sender 
const transporter = nodemailer.createTransport({
    hostname: 'smtp.gmail.com',
    port: 587,
    service : 'Gmail' ,
    auth: {
        user: 'jmalnefaa9',
        pass: 'unlgqwuqlasximpg'
    }
});
/*
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'zoie.sawayn14@ethereal.email',
        pass: 'gm2AYyYA942DMYWddg'
    }
});
*/

const send = (info) => { 
   
    return new Promise (async(resolve,reject)=> { 
        try {
    
            let result = await transporter.sendMail(info);
    
            console.log("Message sent: %s", result.messageId);
          
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(result));
          
         resolve(result)
        } catch (error) {
            console.log(error)
        }

    })


}



const emailProcesser = ({email,pin,type,verificationLink=""}) => { 
    let info =''; 
    switch (type) {
        case "request-new-pass":
            
     info = { 
        
        from: '"SOTETEL Company " ', // sender address
        to: email ,
        subject: "Password reset Pin", 
        text: "Your password reset pin is " + pin + " this pin wil expired in One Day ", // plain text body
        html: "<b>Hello world?</b>", // html body
    }

    case "new_user_confirmation":
            
          info = { 
             
             from: '"SOTETEL Company " ', // sender address
             to: email ,
             subject: "please verify  your new user", 
             text: "please follow the link  to verify your account before expiration", // plain text body
             html: "<b>  Hello </b>    <p> please follow the link  to verify your account before expiration " + ` ${verificationLink}` + " </p> "
           
             // html body
         }
     
    
    send (info)
            break;
    
        default:
            break;
    }

}

const sendsuccessemail = (email) => { 
   
    const info = { 
        
        from: '"SOTETEL Company 👻" <nya.glover74@ethereal.email>', // sender address
        to: email ,
        subject: "Password updated ", 
        text: "Your  password has been updated", // plain text body
        html: "<b>Hello world?</b>", // html body
    }
    send (info)
  
} 


const SendPinToUser = (email,pin ) => { 
   
    const info = { 
        
        from: '"SOTETEL Company " ', // sender address
        to: email ,
        subject: "Password reset Pin", 
        text: "Your password reset pin is " + pin + " this pin wil expired in One Day ", // plain text body
        html: "<b>Hello world Your password reset pin is " + pin + " this pin wil expired in One Day </b>" , // html body
    }
    send (info)
  
}


const SendEmailToAdmin = ( email ,subject, sender, message ,openAt ) => { 
   
    const info = { 
        
        from:  "Sotetel company CRM " , // sender address
        to: "nefaa1999@gmail.com" ,
        subject:  subject, 
        text: message, // plain text body
        html: "<b>This is a message from the  client  " + sender + "  </b>   <p>   Message : " + message  + " send it  : " +  openAt  + " </p>  "    ,
           
    }
    send (info)
  
}

const escladervers = (subject ,status,openAt, sender , message , linkticket) => { 
   
    const info = { 
        
        from:  "message from help desk" , // sender address
        to: "nefaa1999@gmail.com" ,
        subject:subject, 
        Text: "This is a message from the  Help desk to notify with new  client order    </b>   <p> " + "the sender   : \n " +  sender   +   "    status of ticket   :  "  +  status  + "  Message :  " +  message  + " send it  : " +  openAt  + " link of ticket  : " + linkticket  ,
        // plain text body
        html: "<b>This is a message from the  Help desk to notify with new  client order    </b>   <p> " + "the sender   : \n " +  sender   +  "    status of ticket   :  "  +  status  + "  Message :  " +  message  + " send it  : " +  openAt  + "link of ticket :" + linkticket + " </p>  "    ,
           
    }
    send (info)
  
}

module.exports = { 
    send ,emailProcesser,sendsuccessemail,SendPinToUser , SendEmailToAdmin ,escladervers
}