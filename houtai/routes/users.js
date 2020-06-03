const express = require('express');
const router = express.Router();
const user = require("../biz/user")
/* GET users listing. */
router.post('/login', function(req, res) {
  user.login(req,res)
});
router.post('/register', function(req, res) {
    user.register(req,res)
});
router.post('/userName', function(req, res) {
    user.userName(req,res)
});
module.exports = router;
