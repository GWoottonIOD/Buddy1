const multer = require('multer') // first run 'npm install multer'

// first set up the path and filename the image will use
const storage = multer.diskStorage({
    destination: 'public/images/', // store images in public folder of backend, in defined images directory
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname) // timestamp the filename to keep it unique, otherwise files with same name will overwrite
    },
})
    
// create the image upload functions
// single file will be stored in req.file, multiple files are stored in req.files
const uploadFile = multer({ storage: storage }).single("file") // 'file' is the name of the file sent from the front-end in a FormData object
const uploadFiles = multer({ storage: storage }).array("files") // change single to array for multiple, front-end needs to send array in FormData

//working example

// const addTrackImage = (req, res) => {

//     console.log(req.file) // saved filename is in req.file.filename
//     const trackUpdates = { image: '/images/' + req.file.filename};
//     console.log(trackUpdates);
  
//     // save path to uploaded file in DB for this user
//     Models.Track.findByIdAndUpdate(req.params.trackId, trackUpdates, 
      
//       { new: true }
//     ).then(response => 
//         res.status(200).json({ result: 'Image uploaded to profile successfully', data: response}) // send updated info back in response
//     ).catch(err => 
//         res.status(500).json({ result: err.message })
//     )
//   }

module.exports = { uploadFile, uploadFiles };