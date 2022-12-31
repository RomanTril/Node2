const {userService, oauthService} = require("../service");

module.exports={
    getAllUsers:async (req, res, next) => {
        try {
            const users=await userService.findByParams()
            res.json(users)

        }catch (e) {

            next(e)
        }

    },

    getUserById:(req, res, next) => {

        try {
            res.json(req.user)

        }catch (e) {
            next(e)
        }

    },

    createUser:async (req, res, next) => {

        try {
            const hashPassword= await oauthService.hashPassword(req.body.password);

         const user=await userService.createUser({...req.body,password:hashPassword})

            res.status(201).json(user)

        }catch (e) {
            next(e)
        }

    },

    updateUser: async (req, res, next) => {

        try {
            const newUserInfo=req.body;
            const userId=req.params.userId;

           const user=await userService.updateOne(userId,newUserInfo);


            res.status(201).json(user)

        }catch (e) {
            next(e)
        }
    },

    deleteUserById: async (req, res, next) => {

        try{
            await userService.delete({_id:req.params.userId})

            res.status(204).send("ok")
        }catch (e) {
            next(e)
        }

    },

}