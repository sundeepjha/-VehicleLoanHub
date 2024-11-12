const LoanApplication = require('../models/loanApplicationModel');
const nodemailer = require('nodemailer');
const axios = require('axios');
const { GridFSBucket } = require('mongodb');

const ai_api_url = 'https://my-ai-api-qx3d.onrender.com/my_ai_api'

let bucket;
function setBucket(db) {
    bucket = new GridFSBucket(db, { bucketName: 'uploads' });
}

// Get All Loan Applications
async function getAllLoanApplications(req, res) {

    try {
        const { searchValue, statusFilter, page, sortValue, pageSize, sortBy } = req.body;

        // Construct search query
        let searchQuery = {};
        if (searchValue) {
            searchQuery.$or = [
                { userName: { $regex: searchValue, $options: 'i' } },
                { loanType: { $regex: searchValue, $options: 'i' } }
            ];
        }
        if (statusFilter) {
            searchQuery.loanStatus = statusFilter;
        }

        // Pagination and sorting
        const options = {
            sort: { [sortBy]: sortValue },
            skip: (page - 1) * pageSize,
            limit: pageSize
        };

        const loanApplications = await LoanApplication.find(searchQuery, null, options);
        const totalApplications = await LoanApplication.countDocuments(searchQuery);

        res.status(200).json({
            loanApplications,
            totalApplications,
            totalPages: Math.ceil(totalApplications / pageSize),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}

// Get Loan Applications by User ID
async function getLoanApplicationsByUserId(req, res) {
    try {
        const { userId } = req.params;
        const loanApplications = await LoanApplication.find({ userId });
        res.status(200).json(loanApplications);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}

// Get Loan Application by ID
async function getLoanApplicationById(req, res) {
    try {
        const { id } = req.params;
        const loanApplication = await LoanApplication.findById(id).populate("userId");

        if (loanApplication) {
            res.status(200).json(loanApplication);
        } else {
            res.status(404).json({ message: `Loan application with ID ${id} not found` });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}

// 
async function addLoanApplication(req, res) {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    // console.log(req.file);
    try {
        const loan = {
            // _id : req.body._id,
            userId: req.body.userId,
            userName: req.body.userName,
            loanType: req.body.loanType,
            submissionDate: req.body.submissionDate,
            income: req.body.income,
            model: req.body.model,
            purchasePrice: req.body.purchasePrice,
            address: req.body.address,
            proofFile: {
                filename: req.file.filename,
                contentType: req.file.mimetype
            }
        };
        console.log(loan);
        const id = req.body.userId + req.body._id;
        console.log(id)
        const newLoanApplication = await LoanApplication.create({ ...loan, _id: id });
        const data = { "prompt": `Based on the following data, how risky is it to approve a loan for a client?  - Credit score: [${req.body.creditScore}] - Monthly income: [${req.body.income}] - Loan type: [${req.body.loanType}] - Interest rate: [${req.body.interestRate}]% - Loan amount: [${req.body.purchasePrice}] - Loan Term: [${req.body.loanTenure}yrs] .Consider all factors carefully and provide the short risk assessment  report based on this information.\nGive response in below format\n Credit Score: 800 \n A credit score of 800 is excellent, indicating strong financial responsibility and a low likelihood of default. \n Monthly Income: ₹50,000 \n The monthly income is decent but could be considered moderate given the loan amount. A higher income would typically increase repayment capacity. \n Loan Type: Car Loan \n Car loans are generally less risky than other loans like personal loans or business loans due to their secured nature. The vehicle serves as collateral. \n Interest Rate: 7% \n The interest rate is relatively moderate, reflecting a fair borrowing cost for the client. Lower rates could reduce the overall repayment burden, but this is within reasonable limits. \n Loan Amount: ₹15,00,000 \n The loan amount is significant compared to the borrower’s monthly income. The debt-to-income ratio might be a concern, although the excellent credit score mitigates some of this risk. \n Loan Term: 5 years \n A five-year term is typical for a car loan and should allow for manageable monthly payments, although it could strain the borrower’s cash flow given the income level. \n Overall Risk Analysis: 85/100 \n This client poses a relatively low risk of default, primarily due to their excellent credit score. The monthly income-to-loan amount ratio does present some risk, but the secured nature of the loan and the borrower’s strong credit profile offset this.` }
        console.log("Analyzing input.........");
        const response = await axios.post(ai_api_url,data);
        res.status(200).json({ message: 'Added Successfully' });
        await LoanApplication.findByIdAndUpdate(newLoanApplication._id, {comment : response.data.data});
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}

// Update an Existing Loan Application
async function updateLoanApplication(req, res) {
    try {
        const { id } = req.params;
        const updatedLoanApplication = await LoanApplication.findByIdAndUpdate(id, req.body, { new: true }).populate("userId");
        if (updatedLoanApplication) {
            // Check if the loan status has changed
            if (req.body.loanStatus && req.body.loanStatus === updatedLoanApplication.loanStatus) {
                await sendStatusUpdateEmail(updatedLoanApplication);
            }
            res.status(200).json({ message: 'Loan application updated successfully', loanApplication: updatedLoanApplication });
        } else {
            res.status(404).json({ message: `Loan application with ID ${id} not found` });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}

async function sendStatusUpdateEmail(loanApplication) {
    const status = ["pending", "Approved", "Rejected"];
    const { userId, loanStatus } = loanApplication;
    const userEmail = loanApplication.userId.email; // Assuming userId is populated with user details

    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'anudey700@gmail.com',
            pass: 'odkjysbbkggcstyp'
        }
    });

    // Set up email data
    let mailOptions = {
        from: '"Team GAmMA" <anudey700@gmail.com>',
        to: userEmail,
        subject: 'Loan Application Status Update',
        text: `Dear ${loanApplication.userId.userName},\n\nYour loan application status has been updated to: ${status[loanStatus - 1]}.\n\nThank you,\nTeam GAmMA`,
        html: `<p>Dear ${loanApplication.userId.userName},</p><p>Your loan application status has been updated to: <strong>${status[loanStatus - 1]}</strong>.</p><p>Thank you,<br>Team GAmMA</p>`
    };

    try {
        // Send mail with defined transport object
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email: %s', error);
    }
}

// Delete a Loan Application
async function deleteLoanApplication(req, res) {
    try {
        const { id } = req.params;
        const deletedLoanApplication = await LoanApplication.findByIdAndDelete(id);
        if (deletedLoanApplication) {
            res.status(200).json({ message: 'Loan application deleted successfully' });
        } else {
            res.status(404).json({ message: `Loan application with ID ${id} not found` });
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
}

async function showFile(req, res) {
    bucket.openDownloadStreamByName(req.params.filename)
        .pipe(res)
        .on('error', () => res.status(404).json({ message: 'File not found' }));
}

module.exports = {
    getAllLoanApplications,
    getLoanApplicationsByUserId,
    getLoanApplicationById,
    addLoanApplication,
    updateLoanApplication,
    deleteLoanApplication,
    showFile,
    setBucket
};