export const verificationTemplate=(otp)=>{
    return `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: left; padding: 10px 0;">
            <h2 style="color: #008ecc; font-weight: bold; font-size: 20px; margin: 0;">🔐 Security Code</h2>
        </div>
        <div style="padding: 20px; text-align: left;">
            <p style="font-size: 16px; line-height: 1.6; color: #333;">Hi,</p>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">Here is the security code to verify your account:</p>
            <div style="font-size: 32px; font-weight: bold; background-color: #f1f7fa; color: #333; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">${otp}</div>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">If you have not requested for this, please ignore this message.</p>
            <p style="font-size: 10px; line-height: 1.6; color: #333;">- ElDeeb-Technologies</p>
        </div>
        <div style="font-size: 12px; color: #777; text-align: center; padding: 10px; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0;">This is a system generated message. Please do not reply to this mail.</p>
        </div>
    </div>

</div>
`
}