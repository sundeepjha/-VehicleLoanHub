const userController = require('../controllers/userController');

const User = require('../models/userModel');

const mongoose = require('mongoose');
const { validateToken } = require('../authUtils');
const LoanApplication = require('../models/loanApplicationModel');
const Loan = require('../models/loanModel');
const loanController = require('../controllers/loanController');

const loanApplicationController = require('../controllers/loanApplicationController');

describe('User_Model_Test', () => {


  test('backend_usermodel_should_validate_a_user_with_missing_username', async () => {
    const invalidUserData = {
      email: 'demouser@gmail.com',
      mobile: '9876543212',
      password: 'validpassword',
      role: 'user'
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_email', async () => {
    const invalidUserData = {
      userName: 'validUserName',
      mobile: '9876543212',
      password: 'validpassword',
      role: 'user'
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_mobile', async () => {
    const invalidUserData = {
      userName: 'validUserName',
      email: 'demouser@gmail.com',
      password: 'validpassword',
      role: 'user'
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_password', async () => {
    const invalidUserData = {
      userName: 'validUserName',
      email: 'demouser@gmail.com',
      mobile: '9876543212',
      role: 'user'
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });

  test('backend_usermodel_should_validate_a_user_with_missing_role', async () => {
    const invalidUserData = {
      userName: 'validUserName',
      email: 'demouser@gmail.com',
      mobile: '9876543212',
      password: 'validpassword',
    };

    const user = new User(invalidUserData);

    await expect(user.validate()).rejects.toThrowError();
  });
});

describe('LoanApplication_Model_Test', () => {
  test('backend_loanApplicationModel_should_validate_a_loan_application_with_all_required_fields', async () => {
    const validLoanApplicationData = {
      userId: new mongoose.Types.ObjectId().toString(),
      userName: 'John Doe',
      loanType: 'Personal',
      submissionDate: new Date(),
      income: 50000,
      model: new Date(),
      purchasePrice: 200000,
      loanStatus: 1,
      address: '123 Main St',
      file: 'path/to/file.pdf',
    };

    const loanApplication = new LoanApplication(validLoanApplicationData);

    await expect(loanApplication.validate()).resolves.toBeUndefined();
  });

  test('backend_loanApplicationModel_should_validate_a_loan_application_with_missing_userId', async () => {
    const invalidLoanApplicationData = {
      userName: 'John Doe',
      loanType: 'Personal',
      submissionDate: new Date(),
      income: 50000,
      model: new Date(),
      purchasePrice: 200000,
      loanStatus: 1,
      address: '123 Main St',
      file: 'path/to/file.pdf',
    };

    const loanApplication = new LoanApplication(invalidLoanApplicationData);

    await expect(loanApplication.validate()).rejects.toThrowError();
  });

  test('backend_loanApplicationModel_should_validate_a_loan_application_with_missing_userName', async () => {
    const invalidLoanApplicationData = {
      userId: new mongoose.Types.ObjectId().toString(),
      loanType: 'Personal',
      submissionDate: new Date(),
      income: 50000,
      model: new Date(),
      purchasePrice: 200000,
      loanStatus: 1,
      address: '123 Main St',
      file: 'path/to/file.pdf',
    };

    const loanApplication = new LoanApplication(invalidLoanApplicationData);

    await expect(loanApplication.validate()).rejects.toThrowError();
  });
});

describe('Loan_Model_Test', () => {
  test('backend_loanModel_should_validate_a_loan_with_all_required_fields', async () => {
    const validLoanData = {
      loanType: 'Mortgage',
      description: 'Home mortgage loan',
      interestRate: 3.5,
      maximumAmount: 500000,
    };

    const loan = new Loan(validLoanData);

    await expect(loan.validate()).resolves.toBeUndefined();
  });

  test('backend_loanModel_should_validate_a_loan_with_missing_loanType', async () => {
    const invalidLoanData = {
      description: 'Home mortgage loan',
      interestRate: 3.5,
      maximumAmount: 500000,
    };

    const loan = new Loan(invalidLoanData);

    await expect(loan.validate()).rejects.toThrowError();
  });

  test('backend_loanModel_should_validate_a_loan_with_missing_description', async () => {
    const invalidLoanData = {
      loanType: 'Mortgage',
      interestRate: 3.5,
      maximumAmount: 500000,
    };

    const loan = new Loan(invalidLoanData);

    await expect(loan.validate()).rejects.toThrowError();
  });
});

describe('getUserByEmailAndPassword_Test', () => {
  test('backend_getuserbyemailandpassword_in_usercontroller_should_return_200_status_code_when_user_found', async () => {
    const req = { 
      body: {   
        email: 'test@example.com',
        password: 'password123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const user = {
      userName: 'TestUser',
      role: 'user',
      _id: new mongoose.Types.ObjectId()
    };
    User.findOne = jest.fn().mockResolvedValue(user);

    await userController.getUserByEmailAndPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(200);

  });
  test('backend_getuserbyemailandpassword_in_usercontroller_should_return_404_status_code_when_user_not_found', async () => {
    const req = { 
      body: {   
        email: 'nonexistent@example.com',
        password: 'password123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.findOne = jest.fn().mockResolvedValue(null);

    await userController.getUserByEmailAndPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('backend_getuserbyemailandpassword_in_usercontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const req = { 
      body: {   
        email: 'test@example.com',
        password: 'password123'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.findOne = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await userController.getUserByEmailAndPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
describe('addUser_Test', () => {
  test('backend_add_user_in_usercontroller_should_return_200_status_code_when_user_added_successfully', async () => {
    const req = { 
      body: {   
        userName: 'NewUser',
        email: 'newuser@example.com',
        password: 'password123',
        role: 'user',
        mobile:'9876543212'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.create = jest.fn().mockResolvedValue(req.body);

    await userController.addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test('backend_add_user_in_usercontroller_should_return_500_status_code_when_internal_server_error_occurs', async () => {
    const req = { 
      body: {   
        userName: 'NewUser',
        email: 'newuser@example.com',
        password: 'password123',
        role: 'user',
        mobile:'9876544321'
      } 
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    User.create = jest.fn().mockRejectedValue(new Error('Internal Server Error'));

    await userController.addUser(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});



describe('loanApplicationController', () => {

  describe('getLoanApplicationsByUserId', () => {
    test('backend_getloanapplicationsbyuserid_in_loanapplicationcontroller_should_return_loan_applications_by_user_id_and_respond_with_a_200_status_code', async () => {
      const loanApplications = [{ _id: 'loanApp1', userId: 'user1', userName: 'John Doe', loanType: 'Personal' }];
      const req = { params: { userId: 'user1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LoanApplication.find = jest.fn().mockResolvedValue(loanApplications);

      await loanApplicationController.getLoanApplicationsByUserId(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('backend_getloanapplicationsbyuserid_in_loanapplicationcontroller_should_handle_errors_and_respond_with_a_500_status_code_and_error_message', async () => {
      const error = new Error('Database error');
      const req = { params: { userId: 'user1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LoanApplication.find = jest.fn().mockRejectedValue(error);

      await loanApplicationController.getLoanApplicationsByUserId(req, res);

      expect(LoanApplication.find).toHaveBeenCalledWith({ userId: 'user1' });
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: error.message });
    });
  });

  describe('getLoanApplicationById', () => {
    test('backend_getloanapplicationbyid_in_loanapplicationcontroller_should_return_a_loan_application_by_id_and_respond_with_a_200_status_code', async () => {
      const loanApplication = { _id: 'loanApp1', userId: 'user1', userName: 'John Doe', loanType: 'Personal' };
      const req = { params: { id: 'loanApp1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LoanApplication.findById = jest.fn().mockResolvedValue(loanApplication);

      await loanApplicationController.getLoanApplicationById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('backend_getloanapplicationbyid_in_loanapplicationcontroller_should_handle_errors_and_respond_with_a_500_status_code_and_error_message', async () => {
      const error = new Error('Database error');
      const req = { params: { id: 'loanApp1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LoanApplication.findById = jest.fn().mockRejectedValue(error);

      await loanApplicationController.getLoanApplicationById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });

    test('backend_getloanapplicationbyid_in_loanapplicationcontroller_should_handle_not_finding_a_loan_application_and_respond_with_a_404_status_code', async () => {
      const req = { params: { id: 'nonExistentLoanApp' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LoanApplication.findById = jest.fn().mockResolvedValue(null);

      await loanApplicationController.getLoanApplicationById(req, res);

      expect(LoanApplication.findById).toHaveBeenCalledWith('nonExistentLoanApp');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Cannot find any loan' });
    });
  });

  describe('addLoanApplication', () => {
    test('backend_addloanapplication_in_loanapplicationcontroller_should_add_a_loan_application_and_respond_with_a_200_status_code_and_a_success_message', async () => {
      const req = {
        body: {
          userId: 'user1',
          userName: 'John Doe',
          loanType: 'Personal',
          submissionDate: new Date(),
          income: 50000,
          model: new Date(),
          purchasePrice: 200000,
          loanStatus: 1,
          address: '123 Main St',
          file: 'path/to/file.pdf',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LoanApplication.create = jest.fn().mockResolvedValue(req.body);

      await loanApplicationController.addLoanApplication(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Added Successfully' });
    });

    test('backend_addloanapplication_in_loanapplicationcontroller_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      const error = new Error('Database error');
      const req = {
        body: {
          userId: 'user1',
          userName: 'John Doe',
          loanType: 'Personal',
          submissionDate: new Date(),
          income: 50000,
          model: new Date(),
          purchasePrice: 200000,
          loanStatus: 1,
          address: '123 Main St',
          file: 'path/to/file.pdf',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LoanApplication.create = jest.fn().mockRejectedValue(error);

      await loanApplicationController.addLoanApplication(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('updateLoanApplication', () => {
    test('backend_updateloanapplication_in_loanapplicationcontroller_should_update_a_loan_application_and_respond_with_a_200_status_code_and_a_success_message', async () => {
      const req = {
        params: { id: 'loanApp1' },
        body: {
          userName: 'John Doe Updated',
          loanType: 'Personal',
          submissionDate: new Date(),
          income: 60000,
          model: new Date(),
          purchasePrice: 250000,
          loanStatus: 2,
          address: '456 Elm St',
          file: 'path/to/file.pdf',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LoanApplication.findByIdAndUpdate = jest.fn().mockResolvedValue(req.body);

      await loanApplicationController.updateLoanApplication(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('backend_updateloanapplication_in_loanapplicationcontroller_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      const error = new Error('Database error');
      const req = {
        params: { id: 'loanApp1' },
        body: {
          userName: 'John Doe Updated',
          loanType: 'Personal',
          submissionDate: new Date(),
          income: 60000,
          model: new Date(),
          purchasePrice: 250000,
          loanStatus: 2,
          address: '456 Elm St',
          file: 'path/to/file.pdf',
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LoanApplication.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      await loanApplicationController.updateLoanApplication(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('deleteLoanApplication', () => {
    test('backend_deleteloanapplication_in_loanapplicationcontroller_should_delete_a_loan_application_and_respond_with_a_200_status_code_and_a_success_message', async () => {
      const req = { params: { id: 'loanApp1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LoanApplication.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: 'loanApp1' });

      await loanApplicationController.deleteLoanApplication(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('backend_deleteloanapplication_in_loanapplicationcontroller_should_handle_not_finding_a_loan_application_and_respond_with_a_404_status_code', async () => {
      const req = { params: { id: 'nonExistentLoanApp' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LoanApplication.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await loanApplicationController.deleteLoanApplication(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test('backend_deleteloanapplication_in_loanapplicationcontroller_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      const error = new Error('Database error');
      const req = { params: { id: 'loanApp1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      LoanApplication.findByIdAndDelete = jest.fn().mockRejectedValue(error);

      await loanApplicationController.deleteLoanApplication(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});


describe('loanController', () => {
  describe('getAllLoans', () => {
    test('backend_getallloans_in_loancontroller_should_return_all_loans_and_respond_with_a_200_status_code', async () => {
      const loans = [
        { _id: 'loan1', loanType: 'Personal', description: 'Personal loan', interestRate: 5, maximumAmount: 10000 },
        { _id: 'loan2', loanType: 'Home', description: 'Home loan', interestRate: 3.5, maximumAmount: 200000 },
      ];
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Loan.find = jest.fn().mockResolvedValue(loans);

      await loanController.getAllLoans(req, res);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('backend_getallloans_in_loancontroller_should_handle_errors_and_respond_with_a_500_status_code_and_error_message', async () => {
      const error = new Error('Database error');
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Loan.find = jest.fn().mockRejectedValue(error);

      await loanController.getAllLoans(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('getLoanById', () => {
    test('backend_getloanbyid_in_loancontroller_should_return_a_loan_by_id_and_respond_with_a_200_status_code', async () => {
      const loan = { _id: 'loan1', loanType: 'Personal', description: 'Personal loan', interestRate: 5, maximumAmount: 10000 };
      const req = { params: { id: 'loan1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Loan.findById = jest.fn().mockResolvedValue(loan);

      await loanController.getLoanById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('backend_getloanbyid_in_loancontroller_should_handle_errors_and_respond_with_a_500_status_code_and_error_message', async () => {
      const error = new Error('Database error');
      const req = { params: { id: 'loan1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Loan.findById = jest.fn().mockRejectedValue(error);

      await loanController.getLoanById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
    });

    test('backend_getloanbyid_in_loancontroller_should_handle_not_finding_a_loan_and_respond_with_a_404_status_code', async () => {
      const req = { params: { id: 'nonExistentLoan' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Loan.findById = jest.fn().mockResolvedValue(null);

      await loanController.getLoanById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('addLoan', () => {
    test('backend_addloan_in_loancontroller_should_add_a_loan_and_respond_with_a_200_status_code_and_a_success_message', async () => {
      const req = {
        body: {
          loanType: 'New Loan Type',
          description: 'New Description',
          interestRate: 4.5,
          maximumAmount: 15000,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Loan.create = jest.fn().mockResolvedValue(req.body);

      await loanController.addLoan(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('backend_addloan_in_loancontroller_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      const error = new Error('Database error');
      const req = {
        body: {
          loanType: 'New Loan Type',
          description: 'New Description',
          interestRate: 4.5,
          maximumAmount: 15000,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Loan.create = jest.fn().mockRejectedValue(error);

      await loanController.addLoan(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('updateLoan', () => {
    test('backend_updateloan_in_loancontroller_should_update_a_loan_and_respond_with_a_200_status_code_and_a_success_message', async () => {
      const req = {
        params: { id: 'loan1' },
        body: {
          loanType: 'Updated Loan Type',
          description: 'Updated Description',
          interestRate: 3.5,
          maximumAmount: 20000,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Loan.findByIdAndUpdate = jest.fn().mockResolvedValue(req.body);

      await loanController.updateLoan(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('backend_updateloan_in_loancontroller_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      const error = new Error('Database error');
      const req = {
        params: { id: 'loan1' },
        body: {
          loanType: 'Updated Loan Type',
          description: 'Updated Description',
          interestRate: 3.5,
          maximumAmount: 20000,
        },
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Loan.findByIdAndUpdate = jest.fn().mockRejectedValue(error);

      await loanController.updateLoan(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe('deleteLoan', () => {
    test('backend_deleteloan_in_loancontroller_should_delete_a_loan_and_respond_with_a_200_status_code_and_a_success_message', async () => {
      const req = { params: { id: 'loan1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Loan.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: 'loan1' });

      await loanController.deleteLoan(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('backend_deleteloan_in_loancontroller_should_handle_not_finding_a_loan_and_respond_with_a_404_status_code', async () => {
      const req = { params: { id: 'nonExistentLoan' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Loan.findByIdAndDelete = jest.fn().mockResolvedValue(null);

      await loanController.deleteLoan(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });

    test('backend_deleteloan_in_loancontroller_should_handle_errors_and_respond_with_a_500_status_code_and_an_error_message', async () => {
      const error = new Error('Database error');
      const req = { params: { id: 'loan1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Loan.findByIdAndDelete = jest.fn().mockRejectedValue(error);

      await loanController.deleteLoan(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});

describe('validateToken', () => {
 
  test('backend_validatetoken_function_in_authutils_should_respond_with_400_status_for_invalidtoken', () => {
    // Mock the req, res, and next objects
    const req = {
      header: jest.fn().mockReturnValue('invalidToken'),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the validateToken function
    validateToken(req, res, next);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('backend_validatetoken_function_in_authutils_should_respond_with_400_status_for_no_token', () => {
    // Mock the req, res, and next objects
    const req = {
      header: jest.fn().mockReturnValue(null),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    // Call the validateToken function
    validateToken(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});