const { downloadByUrl } = require("./utils");
const fs = require("fs");
const path = require("path");
const { resolve } = require("path");

const download = async (ctx) => {
	const { url, type, qn, path } = ctx.request.body;
	try {
		const res = await downloadByUrl(url, type, qn, path);

		return (ctx.body = {
			state: "200",
			msg: "ok",
			url: encodeURIComponent(`http://114.115.181.249:9529/public/${res}`),
		});
	} catch (err) {
		console.log("err: ", err);
		return (ctx.body = {
			state: "500",
			msg: err,
		});
	}
};

module.exports = {
	download,
};
