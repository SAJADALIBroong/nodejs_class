const sendEmail = require('../helpers/emailService')
const emailSend = async(req,res)=>{
    const {to,subject,email} = req.body;

    try {
        const info = await sendEmail(to, subject, email)
        console.log(`Email send: ${info.response}`)
        res.send({
            message:"Email send successfull "
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Error sending email');
    }
}

module.exports= emailSend