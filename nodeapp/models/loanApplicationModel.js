const mongoose = require('mongoose');

const loanApplicationSchema = mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    loanType: {
        type: String,
        required: true
    },
    submissionDate: {
        type: Date,
        default: Date.now()
    },
    income: {
        type: Number,
        required: true
    },
    model: {
        type: Date,
        required: true
    },
    purchasePrice: {
        type: Number,
        required: true
    },
    loanStatus: {
        type: Number,
        enum: [1, 2, 3],  // 1: pending, 2: approved, 3: approved
        default: 1
    },
    address: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    proofFile: {
        filename: { type: String, required: true },
        contentType: { type: String, required: true }
    }
})

const LoanApplicationModel = mongoose.model('loanApplication', loanApplicationSchema);

module.exports = LoanApplicationModel;