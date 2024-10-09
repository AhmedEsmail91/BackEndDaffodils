import nodemailer from "nodemailer";
import { verificationTemplate } from "./EmailTemplates/verification.template.js";
import { appointmentConfirmationTemplate } from "./EmailTemplates/appointment.template.js";

/**
 * Represents a Mail service.
 * @class
 */
export default class Mail{
    /**
     * Creates an instance of Mail.
     * @param {string} [mailService="gmail"] - The mail service to use (e.g., "gmail", "outlook", "etc...").
     * @param {string} mailUser - The user email address.
     * @param {string} mailPassword - The user email password.
     */
    constructor(mailUser,mailPassword,mailService="gmail"){
        this.transporter = nodemailer.createTransport({
            service: mailService,
            auth: {
                user: mailUser,
                pass: mailPassword,
            }
        });
 
    }
    async verifyEmail(userMail,otp){
        // send mail with defined transport object
        const info=await this.transporter.sendMail({
            from: '"Daffodil Clinic"<'+process.env.EMAIL_NAME+'>', // sender address
            to: userMail,
            subject: "Verification Email",
            html:verificationTemplate(otp)
        });
        console.log("verification email sent"+info.messageId);
    }
    async appointmentConfirmation(user,appointment){ 
        // send mail with defined transport object
        const info=await this.transporter.sendMail({
            from: '"Daffodil Clinic"<'+process.env.EMAIL_NAME+'>', // sender address
            to: user.email,
            subject: "Appointment Confirmation",
            html:appointmentConfirmationTemplate(user,appointment)
        });
        console.log("appointment confirmation email sent"+info.messageId);
    }
}