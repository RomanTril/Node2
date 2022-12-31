const {oauthService} = require("../service");
const {Oauth, User,ActionToken} = require("../dataBase");
// const {ActionToken}=require('../dataBase/ActionToken')
const  emailService = require('../service/email.service')
const {WELCOME, FORGOT_PASS} = require("../config/email-action.enum");
const {FORGOT_PASSWORD} = require("../config/token-action-enum");
const {FRONTEND_URL} = require("../config/config");



module.exports={
    login: async (req,res,next)=>{
        try {
            const {user,body}=req

            await emailService.sendEmail('vika.mandarunka@gmail.com',WELCOME,{userName:user.name})

            await oauthService.comparePassword(user.password,body.password)

            const tokenPair=oauthService.generateAccessTokenPar({id:user._id})

            await Oauth.create({...tokenPair,_user_id:user._id})

            res.json({user,...tokenPair})
        }catch (e) {
            next(e)
        }
    },

    refresh: async (req, res, next) => {
        try {
            const { refreshToken, _user_id } = req.tokenInfo;

            await Oauth.deleteOne({ refreshToken });

            const tokenPair = oauthService.generateAccessTokenPar({ id: _user_id });

            await Oauth.create({ ...tokenPair, _user_id })

            res.status(201).json(tokenPair);
        } catch (e) {
            next(e);
        }
    },

    forgotPassword:async (req,res,next)=>{
        try {
            const user=req.user;

            const actionToken = oauthService.generateActionToken(FORGOT_PASSWORD,{email:user.email});

            const forgotPassFEUrl = `${FRONTEND_URL}/password/new?token=${actionToken}`

            await ActionToken.create({ token:actionToken, _user_id:user._id, tokenType:FORGOT_PASSWORD})

            await emailService.sendEmail('vika.mandarunka@gmail.com',FORGOT_PASS,{url: forgotPassFEUrl})

            res.json('ok');
        }catch (e) {
            next(e);
        }
    },

    forgotPasswordAfterForgot: async (req,res,next)=>{

        try{

            const hashPassword= await oauthService.hashPassword(req.body.password)


            await  ActionToken.deleteOne({token:req.get('Authorization')})
            await User.updateOne({_id: req.user._id},{password:hashPassword})

            res.json('ok')

        }catch (e) {
            next(e)
        }
    },

    logout: async (req, res, next) => {
        try {
            const { accessesToken} = req.tokenInfo;

            await Oauth.deleteOne({ accessesToken });

            res.sendStatus(204)
        } catch (e) {
            next(e);
        }
    },

    logoutAll: async (req, res, next) => {
        try {
            const { _user_id } = req.tokenInfo;

            await Oauth.deleteMany({ _user_id });

            res.status(204);
        } catch (e) {
            next(e);
        }
    },



}