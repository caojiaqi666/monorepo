/*
 * @Author: anjiang
 * @Date: 2023-01-12
 * @LastEditors: anjiang
 * @LastEditTime: 2023-01-12
 * @Description:使用库下载bilibili
 */
const { download } = require("bilibili-save-nodejs");

// 下载up主所有视频
download({
	downloadRange: "byAuthor",
	downloadType: "mp3",
	downloadPath: "https://space.bilibili.com/313580179",
})
	.then(() => console.log("下载成功"))
	.catch((e) => console.log("下载出错"));

// const { downloadByVedioPath, downloadByHomePath } = require("./download.js");
// const path = require("path");

// // 下载单个作品的视频
// downloadByVedioPath({
// 	url: "https://www.bilibili.com/video/BV1AL4y1L7cg",
// 	type: "mp4",
// 	folder: path.join(__dirname, "/foo"),
// })
// 	.then(() => console.log("下载成功"))
// 	.catch((e) => console.log("下载出错"));

// // 下载UP主所有作品的音频
// downloadByHomePath({
// 	url: "https://space.bilibili.com/313580179",
// 	type: "mp3",
// 	folder: path.join(__dirname, "/bar"),
// })
// 	.then(() => console.log("下载成功"))
// 	.catch((e) => console.log("下载出错"));
