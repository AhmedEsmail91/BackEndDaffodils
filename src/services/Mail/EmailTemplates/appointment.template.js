export const appointmentConfirmationTemplate=(user_data,appointment)=>{
    return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
        <div style="text-align: center; padding: 10px 0;">
            <h2 style="color: #008ecc; font-weight: bold; font-size: 24px; margin: 0;">📅 Appointment Confirmation</h2>
        </div>
        <div style="padding: 20px; text-align: left;">
            <p style="font-size: 16px; line-height: 1.6; color: #333;">Hello ${user_data.name},</p>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
                Your appointment has been successfully confirmed! Here are the details of your appointment:
            </p>

            <table style="width: 100%; margin: 20px 0; font-size: 16px; color: #333;">
                <tr>
                    <td style="font-weight: bold;">Appointment Date:</td>
                    <td>${appointment.date}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Doctor:</td>
                    <td>${appointment.doctor}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Appointment Type:</td>
                    <td>${appointment.time}</td>
                </tr>
                <tr>
                    <td style="font-weight: bold;">Location:</td>
                    <td>١ ب Emtedad Shareaa 12,<br>
                        Maadi as Sarayat Al Gharbeyah,<br>  
                        Maadi, Cairo Governorate 11728</td>
                </tr>
            </table>

            <div style="text-align: center; margin: 30px 0;">
                <a href="https://maps.google.com?q=${appointment.location}" style="font-size: 16px; padding: 10px 20px; color: white; background-color: #008ecc; text-decoration: none; border-radius: 5px;">View Location</a>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #333;">
                If you need to reschedule or cancel your appointment, please contact us as soon as possible.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #333;">Best Regards,<br/>Your Clinic Team</p>
        </div>
        <div style="font-size: 12px; color: #777; text-align: center; padding: 10px; border-top: 1px solid #e0e0e0;">
            <p style="margin: 0;">This is an automated message. Please do not reply to this email.</p>
        </div>
    </div>
  </div>
  
    `
}