const nodemailer = require('nodemailer')
require('dotenv').config();


console.log(process.env.EMAIL_PASS)
console.log(process.env.EMAIL_USER)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
})


const sendEmail = async(to,subject,text)=>{
    const mailOptions ={
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        return info
    } catch (error) {
        console.log(error, "inside the email function")
        throw error;
    }
}

module.exports = sendEmail

