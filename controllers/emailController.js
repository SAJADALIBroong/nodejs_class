const sendEmail = require('../helpers/sendEmail')



const emailSend =async(req,res)=>{
    const {to, subject,text}=req.body

   try {
    const info = await sendEmail(to, subject,text)
    console.log(`Email sent: ${info.response}`)
    res.send({
        message: 'email send successfully'
    })

   } catch (error) {
     console.log(error)
   }
}

module.exports = emailSend;