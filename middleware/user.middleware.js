const ApiError= require('../error/ApiError');
const {userService} = require("../service");
const {userNormalizator}=require('../helpers/index');
const userValidator=require('../validators/user.validator');
const commonValidator=require('../validators/common.validator');
const {User} = require("../dataBase");

module.exports={

    getUserDynamically: (fieldName,from='body',dbField=fieldName)=>async (req,res,next)=> {

        try {

            const fieldToSearch=req[from][fieldName];

            const user = await User.findOne({[dbField]:fieldToSearch})

            if (!user) {


                throw new ApiError("user not found", 404)
            }

            req.user=user

            next()

        } catch (e) {
            next(e)
        }
    },

    // isBodyValidCreate:async (req,res,next)=>{
    //     try {
    //         const {name,age,email}=req.body
    //
    //         if(!name && (name.length < 3 || typeof name!=="string" )) {
    //             throw new ApiError("Wrong name", 400)
    //         }
    //
    //         if(!age && (age < 0 || Number.isNaN(+age) )) {
    //             throw new ApiError("Wrong age", 400)
    //         }
    //
    //         if(!email && !email.includes("@") ) {
    //             throw new ApiError("Wrong email", 400)
    //         }
    //
    //         next()
    //
    //     }catch (e) {
    //         next(e)
    //     }
    // },

    // isBodyValidUpdate:async (req,res,next)=>{
    //     try {
    //         const {name,age,email}=req.body
    //
    //         if(name && ( name.length < 3 || typeof name!=="string" )) {
    //             throw new ApiError("Wrong name", 400)
    //         }
    //
    //         if(age && (age < 0 || Number.isNaN(+age) )) {
    //             throw new ApiError("Wrong age", 400)
    //         }
    //
    //         if(email && !email.includes("@") ) {
    //             throw new ApiError("Wrong email", 400)
    //         }
    //
    //         next()
    //
    //     }catch (e) {
    //         next(e)
    //     }
    // },

    userNormalizator:(req,res,next)=>{

        try {
            let {name,email}=req.body;
            req.body.name = userNormalizator.name(name)
            req.body.email=email.toLowerCase()

            next()

        }catch (e) {
            next(e)
        }
    },

    checkIsEmailExist: async (req,res,next)=> {

        try {

            const email=req.body;

            const user = await userService.findOneByParams(email)


            if (!email) {

                throw new ApiError("email not present",404)
            }

            if (user) {

                throw new ApiError("email exist",409)
            }

            next()

        }catch (e) {

            next(e)
        }
    },

    isNewUserValid: async (req,res,next)=>{
        try {
           const validate = userValidator.newUserValidator.validate(req.body)

            if(validate.error){

                throw new ApiError(validate.error.message,400)
            }

            req.body=validate.value

            next()

        }catch (e) {
            next(e)
        }
    },

    isEditUserValid: async (req,res,next)=>{
        try {
            let validate = userValidator.editUserValidator.validate(req.body)

            if(validate.error){
                throw new ApiError(validate.error.message,400)
            }

            req.body=validate.value

            next()

        }catch (e) {
            next(e)
        }
    },

    isIdValid:(req,res,next)=>{
    try {
        const {userId}=req.params

       let validate= commonValidator.idValidator.validate(userId)

        if(validate.error){
            throw new ApiError(validate.error.message,400)
        }

        next()

    }catch (e) {
        next(e)
    }
}
}
