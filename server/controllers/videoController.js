const db = require('../models/usersDatabaseModels.js');

const videoController = {};
// when frontend save video, use habit to name the video file.
// send the video name to backend to store the file in local.
// userController.saveVideo = async (req, res, next) => {
//   const {videoFile} = req.body;
//   const saveVideoQuery = 'INSERT INTO videos (filename) VALUES = $1';
//   const saveVideo = await db.query(saveVideoQuery,[videoFile]).rows[0];
//   // store all videos' path/name ['running','reading','coding]
//   const videoFolder = [];
//   //upload file to local
//   //need to confirm the uploaded video file path.
//   file.mv(`${__dirname}/public/uploads/${saveVideo}`, (err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }
//    });
//    videoFolder.push(saveVideo);
//   res.locals.videoFolder = videoFolder;
//   res.locals.video = saveVideo;
//   return next();
// };

videoController.getVideo = async (req, res, next) => {
  //need to confirm the file paths
  //const uploads = fs.readdirSync('./public/uploads')//return array
  

  


  // return res.json(uploads);
};

videoController.deleteVideo = async (req, res, next) => {}; //stretch

module.exports = videoController;
