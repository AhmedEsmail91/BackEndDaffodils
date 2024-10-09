import express from "express"
import validation from "../../middlewares/validation.js"
import { checkMail } from "../../middlewares/checkMail.js"
import { protectedRoute,signin,signup,changePassword,sendOtp,verifyOtp,resendOTP } from "./auth.controller.js"
import { signinSchemaVal, signupSchemaVal } from "./auth.validation.js"
import cors from 'cors'
const authRouter = express.Router()
// Specify allowed origins
const allowedOrigins = [`http://localhost:${process.env.PORT}`, 'https://allowed-origin2.com'];
// config cors for Origins
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
// Middleware to allow only POST and PATCH methods
function methodFilter(req, res, next) {
  const allowedMethods = ['POST', 'PATCH'];
  if (allowedMethods.includes(req.method)) {
    next();
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
// Apply CORS and method filtering
authRouter.use(cors(corsOptions));
authRouter.use(methodFilter);

authRouter.post('/verify-otp',verifyOtp)

authRouter.post('/signup', validation(signupSchemaVal),checkMail,sendOtp,signup)
authRouter.post('/signin', validation(signinSchemaVal) ,signin)
authRouter.patch('/changePassword',protectedRoute,changePassword)
// authRouter.post('/protected',protectedRoute)

export default authRouter