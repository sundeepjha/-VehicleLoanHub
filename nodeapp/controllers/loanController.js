const Loan = require('../models/loanModel')

// get all loans
async function getAllLoans(req, res) {
    try {
        const loans = await Loan.find({});
        res.status(200).json(loans);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error',error:err.message});
    }
}

//get loan by id
async function getLoanById(req, res) {
    try {
        const id = req.params.id;
        const loan = await Loan.findById(id);
        if (loan) {
            res.status(200).json(loan);
        } else {
            res.status(404).json({ message: `Loan with ID ${id} not found` });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error',error:err.message})
    }
}

//add new loan
async function addLoan(req, res) {
    try {
        const newLoan = await Loan.create(req.body);
        res.status(200).json({ message: 'Loan added successfully', loan: newLoan });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error',error:err.message});
    }
}

// Update an Existing Loan
async function updateLoan(req, res) {
    try {
        const id = req.params.id;
        const updatedLoan = await Loan.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedLoan) {
            res.status(200).json({ message: 'Loan updated successfully', loan: updatedLoan });
        } else {
            res.status(404).json({ message: `Loan with ID ${id} not found` });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error',error:err.message});
    }
}

// Delete a Loan
async function deleteLoan(req, res) {
    try {
        const id = req.params.id;
        const deletedLoan = await Loan.findByIdAndDelete(id);
        if (deletedLoan) {
            res.status(200).json({ message: 'Loan deleted successfully' });
        } else {
            res.status(404).json({ message: `Loan with ID ${id} not found` });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error',error:err.message});
    }
}

module.exports = {
    getAllLoans,
    getLoanById,
    addLoan,
    updateLoan,
    deleteLoan,
};