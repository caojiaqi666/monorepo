const { downloadByUrl } = require("./utils");

const download = async (ctx) => {
	const { url, type, qn, path } = ctx.request.body;
	try {
		await downloadByUrl(url, type, qn, path);
		return (ctx.body = {
			state: "200",
			msg: "ok",
		});
	} catch (err) {
		console.log("err: ", err);
	}
};

module.exports = {
	download,
};
