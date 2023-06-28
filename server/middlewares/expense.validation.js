const {check, validationResult} = require('express-validator');
const Expense = require('../models/expense');

const expenseValidationRules = () => {
    return [
        check('expenseTitle', 'Expense title cannot be left blank')
            .trim()
            .notEmpty(),
        check('expenseDesc', 'A brief description will be great')  
            .trim()
            .notEmpty(),
        check('expenseDate', 'Date cannot be left blank')
            .isDate()
            .notEmpty()
    ]
}

const validateExpense = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('pages/entry_form', { 
            layout: false,
            pageTitle : 'Add expense to be shared | TYSE',
            jsFiles : ['z.validator.js'],
            cssFiles: [],
            formData : {
                expenseTitle : req.body.expenseTitle,
                expenseDesc : req.body.expenseDesc,
                expenseDate : req.body.expenseDate
            },
            errors: errors.array().map(err => {return { [err.param] : err.msg } })
        });
    }
    if (errors.isEmpty()) {
        return next();
    }
}

module.exports = {
    expenseValidationRules,
    validateExpense
}
