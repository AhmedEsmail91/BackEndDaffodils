import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
import Email from "./../../services/Mail/Mail.js"
import { otpModel } from "../../../databases/models/otp.model.js";
import { userModel } from "../../../databases/models/user.model.js"
import AppError from "../../utils/AppError.js";
import { catchError } from "../../middlewares/catchError.js"
// Signup Middleware After OTP Verification
const signup = catchError(async (req, res, next) => {
    console.log('Final Middleware')
    if(!req.cookies.userData) return next(new AppError("Cookie Session Expired Refresh", 400));
    let decoded=jwt.verify(req.cookies.updatedUser,process.env.JWT_SECRET_KEY);
    console.log(JSON.parse(decoded.user))
    let user= new userModel(JSON.parse(decoded.user))
    await user.save();
    let token = jwt.sign({ userId: user._id ,role:user.role}, process.env.JWT_SECRET_KEY)
    res.json({ message: "success" })
}) 
// Signin Middleware
const signin = catchError(async (req, res,next) => {
    let user = await userModel.findOne({ email: req.body.email })

    if (user && bcrypt.compareSync(req.body.password,user.password,8)) {
        //Assign a token to the user
        let token = jwt.sign({ userId: user._id ,role:user.role}, process.env.JWT_SECRET_KEY)
        res.json({ message: "success", token,port:parseInt(process.env.PORT),role:user.role })
    }
    else{
        next(new AppError("Invalid email or password", 401))
    }
})
// after login change the password
const changePassword = catchError(async (req, res,next) => {

    
    let user = await userModel.findById(req.user._id);
    
    if (user && bcrypt.compareSync(req.body.password,user.password,8)) {
        // Regenerate the token
        let token = jwt.sign({ userId: user._id ,role:user.role}, process.env.JWT_SECRET_KEY);
        // Hash the new password
        let newPassword=req.body.newPassword;
        // Update the password in the database
        await userModel.findByIdAndUpdate(req.user._id,{password:newPassword,passwordChangedAt:Date.now()});
        res.json({ message: "success", token })
    }
    else{
        next(new AppError("Invalid old password", 401))
    }
})

// Authentication
const protectedRoute = catchError(async (req, res, next) => {
    let token=req.headers.token
    if(!token) return (next(new AppError("Please login first",401)));
    
    let decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    let user=await userModel.findById(decoded.userId)
    if(!user) return (next(new AppError("User not found",401)));
    if(user.passwordChangedAt){
        let timeChanged=parseInt(user.passwordChangedAt.getTime()/1000);
        if(timeChanged>decoded.iat) return (next(new AppError("Token is invalid... login again",401)));
    }
    req.user=user;
    return next();
});
// Authorization
const allowedTo=(...roles)=>{
    return catchError(
        async (req,res,next)=>{
            let currentUserRole=req.user.role;
            if(!roles.includes(currentUserRole)){
                return next(new AppError("You are not allowed to access this route",403));
            }
            next();
        }
    )
}

// Email verification
const sendOtp = catchError(async (req, res,next) => {
    const {name,email,password,rePassword}= req.body;
    let user={name,email,password,rePassword};
    
    await otpModel.deleteOne({email})
    let otp=Math.floor(100000 + Math.random() * 900000);
    let otp_DBInstance=new otpModel({email,otp});
    await otp_DBInstance.save()

    try{
        res.cookie("userData",JSON.stringify({user:jwt.sign(user,process.env.JWT_SECRET_KEY)}),  {
            maxAge: 3600000, // 2min
            secure: false, // set to true if you're using https
            httpOnly: true,
        });

        let mailDriver=new Email(process.env.EMAIL_NAME,process.env.EMAIL_PASSWORD);
        mailDriver.verifyEmail(email,otp);
        
        res.status(201).json({message:"OTP sent to your email"});
    }
    catch(err){
        next(new AppError("Email not sent",500));
    }
})
const resendOTP = catchError(async (req, res, next) => {
    
    if(!req.cookies.userData) return next(new AppError("Cookie Session Expired Refresh", 400));
    let userData=JSON.parse(req.cookies.userData);

    let otp = Math.floor(100000 + Math.random() * 900000);
    await otpModel.updateOne({ email:userData.email }, { otp });
    let mailDriver = new Email(process.env.EMAIL_NAME, process.env.EMAIL_PASSWORD);
    mailDriver.verifyEmail(userData.email, otp);
    res.status(201).json({ message: "OTP sent to your email" });
})
const verifyOtp = catchError(async (req, res, next) => {
    if(!req.cookies.userData) {
        return next(new AppError("Cookie Session Expired Refresh", 400));}
    let userData=jwt.verify(JSON.parse(req.cookies.userData).user,process.env.JWT_SECRET_KEY);

    if (!req.body.otp) {
        return next(new AppError("Please provide OTP", 400));
    }
    // Find the otp
    let otp_DBInstance = await otpModel.findOne({ email:userData.email });
    if (!otp_DBInstance) {
        return next(new AppError("OTP Expired, Resend OTP", 404));
    }
    // Compare the otp
    if (otp_DBInstance.otp === req.body.otp) {
        userData.confirmEmail=true;
        res.clearCookie('userData');
        res.cookie("updatedUser",jwt.sign({user:JSON.stringify(userData)},process.env.JWT_SECRET_KEY),  {
                    maxAge: 3600000, // 2min
                    secure: false, // set to true if you're using https
                    httpOnly: true,
                });
        await otp_DBInstance.deleteOne({ email:userData.email });
        next();
    } else {
        return next(new AppError("Invalid OTP", 401));
    }
});
export {
    signup, 
    signin,
    changePassword,
    sendOtp,
    resendOTP,
    verifyOtp,
    protectedRoute,
    allowedTo
}