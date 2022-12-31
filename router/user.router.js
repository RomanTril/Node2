const router= require('express').Router();

const userController=require('../controller/user.controller')
const middleware=require('../middleware/user.middleware')
const middlewareOauth=require('../middleware/oauth.middleware')


router.get('/',userController.getAllUsers)

router.post('/',
    // middleware.isBodyValidCreate,
    middleware.isNewUserValid,
    middleware.userNormalizator,
    middleware.checkIsEmailExist,
    userController.createUser)


router.put('/:userId',
    // middleware.isBodyValidUpdate,
    middleware.isIdValid,
    middlewareOauth.checkAccessToken,
    middleware.isEditUserValid,
    middleware.userNormalizator,
    middleware.getUserDynamically('userId','params','_id'),
    userController.updateUser)

router.get('/:userId',
    middleware.isIdValid,
    middlewareOauth.checkAccessToken,
    middleware.getUserDynamically('userId','params','_id'),
    userController.getUserById)

router.delete('/:userId',
    middleware.isIdValid,
    middlewareOauth.checkAccessToken,
    userController.deleteUserById)


module.exports=router;