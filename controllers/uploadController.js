const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
     
      cb(null, file.originalname)
    }
  })

  const upload = multer({storage: storage})

  const uploadFile = (req, res)=>{
    upload.single('myFile')(req,res,(err)=>{
      if (err){
        return res.status(400).json({
            message:"file upload failed",
            error: err.message
        })
      }

      if(!req.file){
        return res.status(400).json({
            message: "file not provided",
        })
      }

      res.send({
        message: "uploaded successfull",
        file: req.file
      })
    })
  }






































// const storage = multer.diskStorage({
//   destination: './public/uploads/',
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); 
//   }
// });


// const upload = multer({
//   storage: storage
// });

// const uploadFile = (req, res) => {
//   upload.single('myFile')(req, res, (err) => {
//     if (err) {
//       return res.status(400).json({ message: 'File upload failed', error: err.message });
//     }
//     if (!req.file) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }
//     res.json({
//       message: 'File uploaded successfully',
//       file: req.file
//     });
//   });
// };

module.exports = uploadFile
