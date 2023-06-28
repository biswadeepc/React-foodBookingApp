const { check, validationResult } = require('express-validator');
const User = require('../models/user')

const userLoginValidationRules = () => {
    return [
        check('email', 'Provide a valid email address')
            .notEmpty()
            .isEmail(),
        check('password')
            .notEmpty()
            .withMessage('Password cannot be blank')    
    ]
}

const userRegistrationValidationRules = () => {
    return [
        check('userName')
            .notEmpty()
            .withMessage('Name cannot be left blank'),
        check('email', 'A valid email is required')
            .notEmpty()
            .isEmail()
            .custom(value => {
                return User.findUserByEmail(value).then(user => {
                    if (user) {
                        return Promise.reject('E-mail already in use');
                    }
                });
            }),
        check('password')
            .isLength({ min: 5 })
            .custom((value, { req }) => {
                if (value !== req.body.confpassword) {
                    throw new Error('Password and confirm password do not match.');
                }
                return true;
            }),
        ]
  }
  
const validateRegistration = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    if (!errors.isEmpty()) {
        return res.render('pages/register', { 
            layout: false,
            pageTitle : 'Register and create free account | TYSE',
            jsFiles : ['z.validator.js'],
            cssFiles: [],
            formData : {
                userName : req.body.userName,
                email : req.body.email,
                contact : req.body.contact
            },
            errors: errors.array().map(err => {return { [err.param] : err.msg } })
        });
    }
  }
  
  const validateLogin = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    if (!errors.isEmpty()) {
        return res.render('pages/login', { 
            layout: false,
            pageTitle : 'Login to your account | TYSE',
            jsFiles : [],
            cssFiles: [],
            formData : {
                email : req.body.email
            },
            errors: errors.array().map(err => {return { [err.param] : err.msg } })
        });
    }
  }

  const addUserForExpenseSharingRules = () => {
      return [
          check('userNum','Valid mobile number is required')
            .trim()
            .notEmpty()
            .isMobilePhone()
      ]
  }

  const validateUserSearch = (req, res, next) => {
      const errors = validationResult(req);
      if(errors.isEmpty()){
          return next()
      }
      if(!errors.isEmpty()){
        return res.render('pages/login', { 
            layout: false,
            pageTitle : 'Login to your account | TYSE',
            jsFiles : [],
            cssFiles: [],
            formData : {
                email : req.body.email
            },
            errors: errors.array().map(err => {return { [err.param] : err.msg } })
        });
      }
  }

  module.exports = {
    userRegistrationValidationRules,
    validateRegistration,
    userLoginValidationRules,
    validateLogin
  }