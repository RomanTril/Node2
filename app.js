const express=require('express');
const mongoose=require('mongoose');
require('dotenv').config()

const oauthRouter=require('./router/oauth.router')
const userRouter=require('./router/user.router')

const configs=require('./config/config')

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/users',userRouter)
app.use('/auth',oauthRouter)

app.use((err,req, res, next)=>{

    res.status(err.status || 500).json({
        message:err.message || "Unknown error",
        status:err.status || 500
    })
});

app.listen(process.env.PORT,async ()=>{
    await mongoose.connect(configs.MONGO_URL)
    console.log(`server listen ${process.env.PORT}`)
})