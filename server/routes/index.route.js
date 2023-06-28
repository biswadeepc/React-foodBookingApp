const router = require('express').Router();

// #region GET requests --
router.get('/', (req, res, next) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

// #endregion

module.exports = router;