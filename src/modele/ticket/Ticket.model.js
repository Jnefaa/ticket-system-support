const {TicketSchema} = require ('./Ticket.schema')

const insertTicket = (ticketObj) => { 
    return new Promise ((resolve,reject)=> { 
        try {
            TicketSchema(ticketObj) 
            .save()
            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        } catch (error) {
            reject(error)
        }


    })
  
}

const getTickets = (clientId) => { 
    return new Promise ((resolve,reject)=> { 
        try {
            TicketSchema
            .find({clientId})
            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        } catch (error) {
            reject(error)
        }


    })
  
}
const getallTicketsfromallusers = () => { 
    return new Promise ((resolve,reject)=> { 
        try {
            TicketSchema
            .find({})
            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        } catch (error) {
            reject(error)
        }


    })
  
}
const getTicketbyId = (_id, clientId) => { 
    return new Promise ((resolve,reject)=> { 
        try {
            TicketSchema.find({_id ,clientId})
            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        } catch (error) {
            reject(error)
        }


    })
  
}


/// GET TICKET BY ID HELP DESK  

const getTicketbyIdHelpdesk = (_id) => { 
    return new Promise ((resolve,reject)=> { 
        try {
            TicketSchema.find({_id})
            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        } catch (error) {
            reject(error)
        }


    })
  
}

const updateclientreply = (_id, message ,sender) => { 
    return new Promise ((resolve,reject)=> { 
        try {
            TicketSchema.findOneAndUpdate(
                {_id },
                { 
                    status:  "Pending operator response",
                    $push : {
                        conversations : {message ,sender},
                            } ,
                           
                 },
                 {new: true}    
                 )

            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        } catch (error) {
            reject(error)
        }


    })
  
}

const updatestatusclose = ({_id,clientId}) => { 
    return new Promise ((resolve,reject)=> { 
        try {
            TicketSchema.findOneAndUpdate(
                {_id,clientId },
                { 
                    status:  "closed",
                
                 },
                 {new: true}    
                 )

            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        } catch (error) {
            reject(error)
        }


    })
  
}


const deleteticket = ({_id}) => { 
    return new Promise ((resolve,reject)=> { 
        try {
            TicketSchema.findOneAndDelete(
                {_id}
                 )

            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        } catch (error) {
            reject(error)
        }


    })
  
}




const updatehelpdeskreply = (_id, message ,sender) => { 
    return new Promise ((resolve,reject)=> { 
        try {
            TicketSchema.findOneAndUpdate(
                {_id },
                { 
                    status:  "Pending client response",
                    $push : {
                        conversations : {message ,sender},
                            } ,
                           
                 },
                 {new: true}    
                 )

            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        } catch (error) {
            reject(error)
        }


    })
  
}
/// GET TICKET BY ID HELP DESK  


  
const getTicketbyIdesclader = (_id ) => { 
    return new Promise ((resolve,reject)=> { 
        try {
            TicketSchema.findById ({_id})
            .then((data)=>resolve(data))
            .catch((error)=>reject(error))
        } catch (error) {
            reject(error)
        }


    })
  
}

module.exports ={insertTicket,
     getTickets,
     getTicketbyId,
     updateclientreply,
     updatestatusclose,
     deleteticket ,
     getallTicketsfromallusers ,
      getTicketbyIdHelpdesk,
      updatehelpdeskreply ,
      getTicketbyIdesclader,}