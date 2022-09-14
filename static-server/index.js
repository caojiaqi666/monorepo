var express = require("express");
var app = express();
app.use(express.static("public")); //该处需要修改，我的静态网页是放在public目录下
//设置监听端口，这个不固定，也可以设置成其他的端口
app.listen(9090, () => {
	console.log("服务器启动成功！");
});
