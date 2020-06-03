const express = require('express');
const router = express.Router();
const good = require("../biz/goods")
/* GET users listing. */
router.post('/getgoodsList', function(req, res) {
    good.getgoodsList(req,res)
});
router.post('/getgoods', function(req, res) {
    good.getgoods(req,res)
});
router.post('/searchgoodsList', function(req, res) {
    good.searchgoodsList(req,res)
});
module.exports = router;
