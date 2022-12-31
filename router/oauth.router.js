const router=require('express').Router()

const oauthMiddleware=require('../middleware/oauth.middleware');
const oauthController=require('../controller/oauth.controller')
const userMiddleware=require('../middleware/user.middleware')



router.post('/login', oauthMiddleware.isBodyValid,userMiddleware.getUserDynamically('email'), oauthController.login);

router.post('/refresh', oauthMiddleware.checkRefreshToken, oauthController.refresh);

router.post('/password/forgot',userMiddleware.getUserDynamically('email'), oauthController.forgotPassword);

router.put('/password/forgot',oauthMiddleware.checkActionToken, oauthController.forgotPasswordAfterForgot);

router.post('/logout', oauthMiddleware.checkAccessToken, oauthController.logout);

router.post('/logoutAll', oauthMiddleware.checkAccessToken, oauthController.logoutAll);


module.exports=router
