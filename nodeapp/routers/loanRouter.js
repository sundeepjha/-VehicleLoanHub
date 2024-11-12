const express = require('express');
const router = express.Router()
const {
    getAllLoans,
    getLoanById,
    addLoan,
    updateLoan,
    deleteLoan,
} = require('../controllers/loanController');
const { validateToken } = require('../authUtils');

router.get('/getAllLoans', validateToken,getAllLoans);
router.get('/getLoanById/:id', getLoanById);
router.post('/addLoan', addLoan);
router.put('/updateLoan/:id', updateLoan);
router.delete('/deleteLoan/:id', deleteLoan);

module.exports = router;