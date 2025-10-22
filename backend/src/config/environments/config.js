const { config } = require("dotenv");

config();

module.exports = {
  port: process.env.PORT|| 3000,
  dbUrl: process.env.DB_URL|| "mongodb://localhost:27017/myapp",
  jwtSecret: process.env.JWT_SECRET|| "your_jwt_secret_key",
  googleClientId: process.env.GOOGLE_CLIENT_ID|| "your_google_client_id",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET|| "your_google_client_secret",
  callbackUrl: process.env.CALLBACK_URL || "http://localhost:3000/api/auth/google/callback",
  nodeEnv: process.env.NODE_ENV || "development",
};
