const express=require('express');
//引入用户路由器
const userRouter=require('./routes/user.js');
//引入商品路由器
const productRouter=require('./routes/product.js');

//引入body-parser中间件
const bodyParser=require('body-parser');
var app=express();
app.listen(8080);
//使用中间件
app.use(bodyParser.urlencoded({
	extended:false
}));

app.use(express.static('./pubilc'));
//使用路由器 挂载到/user下
app.use('/user',userRouter );
//使用商品路由器，挂载到/product     /product/list
app.use('/product',productRouter);








