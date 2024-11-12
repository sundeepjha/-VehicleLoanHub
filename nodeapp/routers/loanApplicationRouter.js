const express = require('express');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const router = express.Router();
const {
    getAllLoanApplications,
    getLoanApplicationsByUserId,
    getLoanApplicationById,
    addLoanApplication,
    updateLoanApplication,
    deleteLoanApplication,
    showFile
} = require('../controllers/loanApplicationController');

const storage = new GridFsStorage({
    url: 'mongodb://127.0.0.1:27017/vehicleLoanHub',
    file: (req, file) => ({
        bucketName: 'uploads',
        filename: file.originalname
    })
});

const upload = multer({ storage });

router.post('/getAllLoanApplications', getAllLoanApplications);
router.get('/getLoanApplicationsByUserId/:userId', getLoanApplicationsByUserId);
router.get('/getLoanApplicationById/:id', getLoanApplicationById);
router.post('/addLoanApplication', upload.single('proofFile'), addLoanApplication);
router.put('/updateLoanApplication/:id', updateLoanApplication);
router.delete('/deleteLoanApplication/:id', deleteLoanApplication);
router.get('/file/:filename', showFile)

module.exports = router;
