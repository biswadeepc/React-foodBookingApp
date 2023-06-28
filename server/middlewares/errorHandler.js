const logger = require('../utils/logger');
const BaseError = require('../errorHandlers/baseError');
const appSettings = require('../app.settings');

function logError(err) {
    logger.error(err.stack);
}

function logErrorMiddleware(err, req, res, next) {
    logError(err);
    next(err);
}

function returnError(err, req, res, next) {
    res.status(err.statusCode || 500);
    res.render(appSettings.ERROR_PAGE.PAGE, {
        layout: false,
        errStatus: err.statusCode || 500,
        pageTitle: `${err.statusCode || 500} | Oops! error encountered`,
        pageMessage: err.name,
        jsFiles: [],
        cssFiles: []
    });
}

function isOperationalError(error) {
    if (error instanceof BaseError) {
        return error.isOperational
    }
    return false
}

module.exports = {
    logError,
    logErrorMiddleware,
    returnError,
    isOperationalError
}