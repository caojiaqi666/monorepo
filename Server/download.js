/*
 * @Author: anjiang
 * @Date: 2023-01-13
 * @LastEditors: anjiang
 * @LastEditTime: 2023-01-17
 * @Description: s\
 */
const serveUrl = "http://114.115.181.249:9529";
const axios = require("axios");

const fn = async () => {
	axios({
		method: "post",
		url: `${serveUrl}/downloadBi`,
		data: {
			url: "https://www.bilibili.com/video/BV1GY41117pZ/?spm_id_from=333.1007.tianma.4-2-12.click&vd_source=0636d6c1264f7969c60706a07d83d810",
			type: "mp4",
			qn: "1080p+",
			path: "./public",
		},
	}).then((res) => {
		console.log("res: ", res.data);
	});
};

fn();
