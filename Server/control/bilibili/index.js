const { downloadByUrl } = require("./utils");
const fs = require("fs");
const path = require("path");
const { resolve } = require("path");

const download = async (ctx) => {
	const { url, type, qn, path } = ctx.request.body;
	console.log("------", resolve(__dirname, "public"));
	try {
		await downloadByUrl(url, type, qn, path);
		//响应首部 Access-Control-Expose-Headers 就是控制“暴露”的开关，它列出了哪些首部可以作为响应的一部分暴露给外部。
		// ctx.set("Access-Control-Expose-Headers", "content-disposition");
		// ctx.set(
		// 	"content-disposition",
		// 	"attachment;filename=" + encodeURLComponent("test.mp4")
		// );

		return (ctx.body = {
			state: "200",
			msg: "ok",
			url: `http://localhost:9529`,
		});
	} catch (err) {
		console.log("err: ", err);
	}
};

module.exports = {
	download,
};
