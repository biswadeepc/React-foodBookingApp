const router = require('express').Router()
const { isAuth } = require('../middlewares/auth')

// #region GET requests --
router.get('/', (req, res, next)=>{
    res.send({express:'You are connected with backend server for food booking app'});
});
// #endregion

module.exports = router;