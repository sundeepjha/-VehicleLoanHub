// const multer = require('multer');
// const { GridFsStorage } = require('multer-gridfs-storage');
// const crypto = require('crypto');
// const path = require('path');

// // MongoDB URI
// const mongoURI = 'mongodb://localhost:27017/vehicleLoanHub';

// // Create storage engine
// const storage = new GridFsStorage({
//   url: mongoURI,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: 'LoanApplication'
//         };
//         resolve(fileInfo);
//       });
//     });
//   }
// });

// const upload = multer({ storage });

// module.exports = upload;