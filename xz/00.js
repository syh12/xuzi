const express=requery('express');
//引入连接池模块
const pool=require('../pool.js');
var  router=express.Router();
//添加路由
//1. 用户注册
router.post('/reg',function(req,res){
 // 1.1获取post 请求的数据
 var obj=req.body;
 console.log(obj);
 //1.2验证数据是否为空
 if(!obj.uname){
  res.send({code:401,msg:'uname required'});
   //阻止往后执行
   return;
 }
    if(!obj.upwd){
  res.send({code:402,msg:'upwd  required'});
   return;
 }
 if(!obj.email){
  res.send({code:403,msg:'email required'});
   return;
 }
 if(!obj.phone){
  res.send({code:404,msg:'phone  required'});
   return;
  }
 //1.3执行sql语句
 pool.query('INSERT INTO xz_user SET ?',[obj],function(err,result){
  if(err) throw err;
  //如果注册成功则打印
   if(result.affectedRows>0){res.send({code:200,msg:'register suc'})};
  //console.log(result);
   });
 
 
 //res.send('注册成功');
 //req.require('./routes/user.js');
});

//导出对象
module.exports=router;