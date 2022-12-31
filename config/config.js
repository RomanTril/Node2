module.exports={
    PORT:process.env.PORT || 5000,
    DB_PASSWORD:process.env.DB_PASSWORD || '45612315',
    MONGO_URL:process.env.MONGO_URL || 'mongodb://0.0.0.0:27017/test-project',
    FRONTEND_URL:process.env.FRONTEND_URL || 'https://google.com',

    ACCESS_SECRET: process.env.ACCESS_SECRET || 'secretWorld',
    REFRESH_SECRET: process.env.REFRESH_SECRET || 'secretRefreshWorld',

    NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
    NO_REPLY_EMAIL_PASSWORD: process.env.NO_REPLY_EMAIL_PASSWORD,

    CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET:process.env.CONFIRM_ACCOUNT_ACTION_TOKEN_SECRET || 'CAATS',
    FORGOT_PASSWORD_ACTION_TOKEN_SECRET:process.env.FORGOT_PASSWORD_ACTION_TOKEN_SECRET || 'FPAS'



}