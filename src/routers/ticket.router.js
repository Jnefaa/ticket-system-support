const express =require("express") 
const router =express.Router() 
const {insertTicket,
     getTickets,
     getTicketbyId,
     updateclientreply,
     updatestatusclose,
     deleteticket,
     getallTicketsfromallusers ,
     getTicketbyIdHelpdesk , 
     updatehelpdeskreply ,
     getTicketbyIdesclader,} =  require ('../modele/ticket/Ticket.model')
const {userAuthorization,HdeskAuthorization} = require ('../middlewares/authorization.middleware')
const {createNewTicketValidation, replyTicketMessageValidation} =require ('../middlewares/formValidationform.middlewares')

const  {SendEmailToAdmin,escladervers} = require ('../helpers/email.helper')

const  {getUserById} = require ('../modele/user/User.model')
const ticketurl = "http://localhost:3006/ticket/"
router.all('/',  (req,res,next)=> { 
next()
 }); 

      //insert ticket in  mongo databases

router.post("/",createNewTicketValidation, userAuthorization,  async (req,res)=> { 

     try {
     

          const { email , subject, sender, message ,openAt} =req.body ;
             const userId =(req.userId)
          const ticketObj = { 
               clientId: userId , 
               subject , 
               openAt ,
               conversations : [ 
                    { 
                         sender , 
                         message, 
                    }, 
               ],
     
          }
          const result = await insertTicket(ticketObj); 
         // const eml = await getUserByEmail(email) 

          // email send to user  
         const sendit = await SendEmailToAdmin ( email , subject, sender, message , new Date().toLocaleDateString())
         // console.log(result)
         if (sendit) { 
          return res.json ({status: "success" , message : "Your Ticket was send it to the Admin  "})
         }
         console.log(sendit)
          if (result._id) { 
               return res.json ({status: "success" , message : "New Ticket has been created "})
          }
     
       res.json ({status: "error" , message : "Unable to create the ticket , please try again later  "})


     } catch (error) {
          res.json ({status: "error" , message:error.message})
          
     }



      
})



//Get all ticket from spesific userid 


router.get("/", userAuthorization,  async (req,res)=> { 

    try {
            const userId =(req.userId)

             const result =  await getTickets(userId)
           console.log(result) 
              return res.json ({
                   status: "success" ,
                    result })
         
    


      } 
         catch (error) {
            res.json ({status: "error" , message:error.message})
         
           }



     
}) 
//get all ticket from all user  
router.get("/all", userAuthorization,  async (req,res)=> { 

     try {
 
              const result =  await getallTicketsfromallusers()
            console.log(result) 
               return res.json ({
                    status: "success" ,
                     result })
 
       } 
          catch (error) {
             res.json ({status: "error" , message:error.message})
          
            }
 
 
 
      
 }) 

//Get a specific Ticket from a specifict user  

router.get("/:_id", userAuthorization,  async (req,res)=> { 
      const {_id} = req.params ; 
     try {
             const clientId =(req.userId)
 
              const result =  await getTicketbyId(_id,clientId)
            console.log(result) 
               return res.json ({
                    status: "success" ,
                     result })
          
     
 
 
       } 
          catch (error) {
             res.json ({status: "error" , message:error.message})
          
            }
 
 
 
      
 })
//Update reply  from client   
router.put("/:_id",replyTicketMessageValidation, userAuthorization,  async (req,res)=> { 
     
    try {
            const {message,sender} = req.body
             const {_id} = req.params ;  

             const result =  await updateclientreply(_id,message,sender)
           console.log(result) 
           if(result._id) { 

               return res.json ({
                    status: "success" ,message : " your message Updated"
                      }) 

           }
              
     

      } 
         catch (error) {
            res.json ({status: "error" , message:"Unable to update your message please try again "})
         
           }



     
})

//update ticket to close  
router.patch("/close-ticket/:_id", userAuthorization,  async (req,res)=> { 
     
     try {
              const {_id} = req.params ;  
             const clientId = req.userId
              const result =  await updatestatusclose ({_id,clientId})
            console.log(result) 
            if(result._id) { 
 
                return res.json ({
                     status: "success" ,message : " the ticket has been closed "
                       }) 
 
            }
            res.json ({
               status: "error" ,message : " Unable to update the ticket "
                 }) 
      
 
       } 
          catch (error) {
             res.json ({status: "error" , message:error.message})
          
            }
 
 
 
      
 })



 //delete ticket  

 router.delete("/delete/:_id",  async (req,res)=> { 
     
     try {
              const {_id} = req.params ;  
             
              const result =  await deleteticket ({_id})
            console.log(result) 
           
 
                return res.json ({
                     status: "success" ,message : " the ticket has been deleted "
                       }) 
      
 
       } 
          catch (error) {
             res.json ({status: "error" , message:error.message})
          
            }
 
 
 
      
 })

/// get ticket from any user (help desk)
 router.get("/helpdesk/:_id" , async (req,res)=> { 
     const {_id} = req.params ; 
    try {

             const result =  await getTicketbyIdHelpdesk(_id)
           console.log(result) 
              return res.json ({
                   status: "success" ,
                    result })
         
    


      } 
         catch (error) {
            res.json ({status: "error" , message:error.message})
         
           }



     
})


//Update reply  from client   
router.put("/helpdesk/:_id",replyTicketMessageValidation, HdeskAuthorization,  async (req,res)=> { 
     
     try {
             const {message,sender} = req.body
              const {_id} = req.params ;  
 
              const result =  await updatehelpdeskreply(_id,message,sender)
            console.log(result) 
            if(result._id) { 
 
                return res.json ({
                     status: "success" ,message : " your message Updated"
                       }) 
 
            }
               
      
 
       } 
          catch (error) {
             res.json ({status: "error" , message:"Unable to update your message please try again "})
          
            }
 
 
 
      
 })



 /// esclader ticket vers l admin  
 

router.post("/esclader/:_id" ,  async (req,res)=> { 
     const {_id} = req.params ; 
    try {
         
             const result =  await getTicketbyIdesclader(_id)
          
           
             const sendit = await escladervers ( result.subject ,
                result.status,
                result.conversations[0].msgAt ,
                 result.conversations[0].sender ,
                  result.conversations[0].message,
                  ticketurl+_id ,
                  )
           if (sendit) { 
            return res.json ({status: "success" , message : "Your Ticket was send it to the Admin  "})
            }
            
           console.log(result.subject) 
           console.log(result.status)
           console.log(result.conversations.length)
              return res.json ({
                   status: "success" ,
                    result })
         
    


      } 
         catch (error) {
            res.json ({status: "error" , message:error.message})
         
           }



     
})

module.exports=router ; 