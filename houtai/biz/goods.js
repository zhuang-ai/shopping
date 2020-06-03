//商品模块
const msgResult = require("../util/msgResult");
const mysqlOpt = require("../util/mysqlOpt");
//获取所有商品列表
let getgoodsList= async (req,res)=>{
    let content = await mysqlOpt.exec("select id,name,old_price,new_price,img,time,left_count,status from shopping");
    // console.log(content)
    res.send(msgResult.ok(content))
}
//获取搜索商品列表
let searchgoodsList= async (req,res)=>{
    let body = req.body;
    let name = body.name;
    let content = await mysqlOpt.exec(`select id,name,old_price,new_price,img,time,left_count,status from shopping where name like'%${name}%'`);
    console.log(content)
    res.send(msgResult.ok(content))
}
//获取商品信息
let getgoods= async (req,res)=>{
    let body = req.body;
    console.log(body)
    let id = body.id;
    let content = await mysqlOpt.exec(`select name,old_price,new_price,img,left_count from shopping where id= ${id}`);
    // console.log(content)
    res.send(msgResult.ok(content))
}
module.exports = {getgoodsList,getgoods,searchgoodsList}