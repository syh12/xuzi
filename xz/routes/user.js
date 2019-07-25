const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
//创建路由器对象
var router=express.Router();
//添加路由
//1.用户注册
router.post('/reg',function(req,res){
  var obj=req.body;
  console.log(obj);
//验证数据是否为空
  if(!obj.uname){
  res.send({cide:401,msg:'uname required'});
  //阻止往后执行
  return;
  }
  if(!obj.upwd){
  res.send({cide:402,msg:'upwd required'});
  return;
  }
  if(!obj.email){
  res.send({cide:403,msg:'email required'});
  return;
  }
   if(!obj.phone){
  res.send({cide:404,msg:'phone required'});
  return;
  }
  //执行SQL语句
pool.query('INSERT INTO xz_user SET?',[obj],function(err,result){
  if(err) throw err;
  //console.log(result);
  //如果注册成功
  //{code:200,msg:'register suc'}
  if(result.affectedRows>0){
  res.send({code:200,msg:'register suc'});
  }
  

});
});

//2.用户登录
//3
router.get('/detail',function(req,res){
  //2.1获取数据
	var obj=req.query;
	console.log(obj);
  //2.2验证数据是否为空
		 //if(!obj.uid){
			//res.send({code:401,msg:'uid required'});
			//return;

	
	
	
	}
	);
//2.3执行SQL语句
/*  //查找用户和密码同时满足的数据
  pool.query('SELECT * FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
		if(err) throw err;
		//console.log(result);
        //判断是否登录成功
		if(result.length>0){
			res.send(result[0]);
			}else{
			res.send({code:301,msg:'can ont found'});
			}
   
   });*/

// 4 修改对象
router.get('/update',function(req,res){
		var obj=req.query;
		console.log(obj);
		//4.2验证对象是否为空
		//遍历对象，获取每个属性值
		var i=400;
		for(var key in obj){
			i++;

			//console.log(key,obj[key])
		//如果属性值为空则提示属性名是必须得
		if(!obj[key]){
			res.send({
				code:i, msg:key+' required'});
			return;
		}
		}
		//4.3执行sql语句 
pool.query('UPDATE xz_user SET ? WHERE			  uid=?',[obj,obj.uid],function(err,result){
	if(err)throw err;
	//console.log(result);
	if(result.affectedRows>0){
		res.send({code:200,msg:'update suc'});
	}else{
		res.send({code:301,msg:'updata err'});
	}


});


		
})

//5.用户列表
router.get('/list',function(req,res){
	var obj=req.query;
	console.log(obj);
	var pno=obj.pno;
	var size=obj.size;
	if(!pno) pno=1;
	if(!size) size=3;
	pno=parseInt(pno);
	size=parseInt(size);
	var  start=(pno-1)*size;	
	pool.query('SELECT * FROM xz_user LIMIT ?,?',[start,size],function(err,result){
		if(err) throw err;
	res.send(result)
	
	});
});	

//6.删除用户

router.get('/delete',function(req,res){
		var obj=req.query;
		if(!obj.uid){
		res.send({code:401,msg:'uid required'});
		return;
		
		
		
		}
		pool.query('DELETE FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
			if(err) throw err;
			console.log(result);
			if(result.affectedRows>0){
				res.send({code:200,msg:'delete  suc'});
				}else{res.send({code:301,msg:'delete err'});}
			
		
		});
		//res.send('删除成功');


});
		
	
	
	
    










//导出路由器对
module.exports=router;