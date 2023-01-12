const { downloadByUrl } = require("./self/index");

try {
	downloadByUrl(
		"https://www.bilibili.com/video/BV1GY41117pZ/?spm_id_from=333.1007.tianma.4-2-12.click&vd_source=0636d6c1264f7969c60706a07d83d810",
		"mp4",
		"1080p+",
		"./video"
	);
} catch (err) {
	console.log("err: ", err);
}
