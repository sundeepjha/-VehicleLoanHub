const mongoose = require('mongoose');

const loanSchema = mongoose.Schema({
    loanType: {
        type: String,
        required: true,
        index: true
    },
    description : {
        type: String,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    maximumAmount: {
        type: Number,
        required: true
    }
})

const LoanModel = mongoose.model('loans', loanSchema);

module.exports = LoanModel;