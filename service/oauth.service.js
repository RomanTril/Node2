const bcrypt=require('bcrypt');

const ApiError= require("../error/ApiError");

const jwt=require('jsonwebtoken')

const { ACCESS_SECRET, REFRESH_SECRET, CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET, FORGOT_PASSWORD_ACTION_TOKEN_SECRET}=require('../config/config')
const {tokenTypeEnum} = require("../enum");
const tokenType = require("../config/token-action-enum");

module.exports= {
    hashPassword: (password) => bcrypt.hash(password, 10),

    comparePassword: async (hashPassword, password) => {

        const isPasswordSame = await bcrypt.compare(password, hashPassword)

        if (!isPasswordSame) {
            throw new ApiError("Wrong email or password", 400)
        }

    },

    generateAccessTokenPar: (dataToSign = {}) => {

        const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, {expiresIn: '15m'})
        const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }

    },

    generateActionToken: (actionType, dataToSign = {}) => {

        let secretWord="";

        switch (actionType) {
            case tokenType.CONFIRM_ACCOUNT:
                secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
                break;
            case tokenType.FORGOT_PASSWORD:
                secretWord = FORGOT_PASSWORD_ACTION_TOKEN_SECRET;
                break;
        }

        return jwt.sign(dataToSign, secretWord, {expiresIn: '7d'})

    },





    checkToken: (token = '', tokenType = tokenTypeEnum.accessToken) => {
        try {
            let secret = '';

            if (tokenType === tokenTypeEnum.accessToken) secret = ACCESS_SECRET;
            else if (tokenType === tokenTypeEnum.refreshToken) secret = REFRESH_SECRET;

            return jwt.verify(token, secret);
        } catch (e) {
            throw new ApiError('Token not valid', 401);
        }
    },

    checkActionToken: (token, actionType) => {

        try {
            let secretWord= ""

        switch (actionType) {
            case tokenType.CONFIRM_ACCOUNT:
                secretWord = CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET;
                break;
            case tokenType.FORGOT_PASSWORD:
                secretWord = FORGOT_PASSWORD_ACTION_TOKEN_SECRET;
                break;
        }

        jwt.verify(token,secretWord)

        }catch (e) {

            throw new ApiError('Token not valid', 401);
        }

    },


}

