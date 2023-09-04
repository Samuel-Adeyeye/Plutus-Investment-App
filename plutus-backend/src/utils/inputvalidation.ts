import Joi from "joi";

export const signUpUser = Joi.object({
  firstName: Joi.string().required()
    .messages({
    'any.required': 'Firstname is required'
  }),
  lastName: Joi.string().required()
  .messages({
    'any.required': 'Lastname is required'
  }),
  email: Joi.string().email().required()
  .messages({
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(7)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 7 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      'any.required': 'Password is required',
    })
});



export const createAdminSchema = Joi.object({
  firstName: Joi.string().required()
  .messages({
    'any.required': 'Firstname is required'
  }),
  lastName: Joi.string().required()
  .messages({
    'any.required': 'Lastname is required'
  }),
  email: Joi.string().email().required()
  .messages({
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(7)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 7 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      'any.required': 'Password is required',
    })
});

export const createCompanySchema = Joi.object({
  companyName: Joi.string().required()
  .messages({
    'any.required': 'Please provide company name.'
  }),
  company_description: Joi.string().required()
  .messages({
    'any.required': 'Please provide company description.'
  }),
  email: Joi.string().email().required()
  .messages({
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(7)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 7 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      'any.required': 'Password is required',
    }),
  businessType: Joi.string().required()
  .messages({
    'any.required': 'Business type is required'
  }),
  roi: Joi.any().required(),
  investment_category: Joi.string().required()
  .messages({
    'any.required': 'Investment category is required'
  }),
  investment_description: Joi.string().required()
  .messages({
    'any.required': 'Please provide a description for this investment'
  }),
  duration: Joi.string().required(),
  min_investment_amount: Joi.number().required()
  .messages({
    'any.required': 'Minimum investment amount is required'
  }),
  max_investment_amount: Joi.number().required()
  .messages({
    'any.required': 'Maximum investment amount is required'
  }),
});

export const clientLogin = Joi.object({
  email: Joi.string().email().required()
    .messages({
      'any.required': 'email is required'
    }),
  password: Joi.string().min(7)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 7 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      'any.required': 'Password is required',
    })
});

export const companyLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 7 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      'any.required': 'Password is required',
    })
});

export const createBeneficiary = Joi.object({
  beneficiaryName: Joi.string().required()
  .messages({
    'any.required': 'Beneficiary name is required'
  }),
  accountNumber: Joi.string().required()
  .messages({
    'any.required': 'Account number is required'
  })
});

export const transfer_Beneficiary = Joi.object({
  beneficiary_name: Joi.string().required()
  .messages({
    'any.required': 'Beneficiary name is required'
  }),
  accountNumber: Joi.string().required()
  .messages({
    'any.required': 'Account number is required'
  }),
  amount: Joi.number().required()
  .messages({
    'any.required': 'Amount is required'
  }),
  beneficiary_email: Joi.string().email().required(),
  payer_reference: Joi.string().required()
  .messages({
    'any.required': 'Payer reference is required'
  }),
  information_for_beneficiary: Joi.string().required()
  .messages({
    'any.required': 'Please provide beneficiary information'
  }),
  transfer_purpose: Joi.string().required(),
});

export const transfer_InvestmentCompany = Joi.object({
  amount: Joi.number().required()
    .messages({
      'any.required': 'Please enter amount',
    }),
  company_account_number: Joi.string().required()
    .messages({
      'any.required': 'Please provide company account number',
    }),
});

export const transferToSavings_Wallet = Joi.object({
  amount: Joi.number().required()
    .messages({
      'any.required': 'Please enter amount',
    }),
});

export const userProfileUpdate = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.string(),
  address: Joi.string(),
  zipCode: Joi.string(),
  city: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
});

export const forgot_password = Joi.object({
  email: Joi.string().email().messages({
    'string.email': 'email is required',
  }),
});

export const verifyChangePassword_Email = Joi.object({
  email: Joi.string().email()
    .messages({
      'string.email': 'email is required',
    }),
});

export const createUser_Image = Joi.object({
  email: Joi.string().email().messages({
    'string.email': 'email is required',
  }),
});

export const verifyChange_Password = Joi.object({
  oldPassword: Joi.string().min(7)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 7 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      'any.required': 'Password is required',
    }),
  newPassword: Joi.string().min(7)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    .required()
    .messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 7 characters long',
      'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      'any.required': 'Password is required',
    }),
  confirm_password: Joi.ref("newPassword")
});
