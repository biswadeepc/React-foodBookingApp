const path = require('path');
const express = require('express');
const cors = require('cors');
const config = require('./config/config');
const logger =  require('./utils/logger');
const terminate = require('./utils/terminate');
const homeRoute = require('./routes/home.route');
const userRoute = require('./routes/user.route');
const port = config.port || 5010;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use('/api/v1.0.0', homeRoute);
app.use('/api/v1.0.0', userRoute);

const server = app.listen(port, (err, req, res)=>{
    if(err){
        logger.debug('Express server could not be started.');
    }
    logger.debug('express server started on port ' + port);
});

// #region Termination on uncaught & unhandled error
const exitHandler = terminate(server, {
    coredump: false,
    timeout: 500
  });
  
process.on('uncaughtException', exitHandler(1, 'Unexpected Error'));
process.on('unhandledRejection', exitHandler(1, 'Unhandled Promise'));
process.on('SIGTERM', exitHandler(0, 'SIGTERM'));
process.on('SIGINT', exitHandler(0, 'SIGINT'));

// #endregion
