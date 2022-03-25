const dotenv =require('dotenv') ; 
dotenv.config({path:'./src/.env'})


const express= require("express");  
const res = require("express/lib/response");
const app = express();
const bodyParser =require("body-parser")
const cors =require("cors")
const helmet=require("helmet");
const morgan = require("morgan");



const port = process.env.PORT || 3001 

//load router
const userRouter=require("./src/routers/user.router")
const ticketRouter=require("./src/routers/ticket.router")
const tokensRouter = require ("./src/routers/tokens.router")
//app security
//app.use(helmet()) ; 

//handle cors error
app.use(cors()) ; 

//Logger Morgan 
app.use(morgan('tiny')); 

//connection mongo db
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true ,useUnifiedTopology: true});
 


if(process.env.NODE_ENV !== "production") { 
    const mDB =mongoose.connection 
    mDB.on("open",() => { 
       console.log("Mongo db is connected") ; 
    });

    mDB.on("error",(error) => { 
        console.log(error) ; 
     })
} 


//set body parser
app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json()); 

//user router 
app.use("/v1/user",userRouter);
app.use("/v1/ticket",ticketRouter);
app.use("/v1/tokens",tokensRouter)

//const handlererror
const handleError = require('./src/utils/errorHandler') ; 

app.use((req,res,next)=> { 
    const error = new Error("Resources not found") ;
    error.status = 404 ;
    next(error) ;
})  ; 

app.use((error, req, res, next) =>{ 
    handleError(error, res)
})



const req = require("express/lib/request");
const { options } = require('mongoose');




app.listen(port, () => {
    console.log(`API is ready on http://localhost:${port}`); })
//app.listen(3001, () => console.log('Server started...'));