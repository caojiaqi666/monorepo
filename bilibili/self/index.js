/*
 * @Author: anjiang
 * @Date: 2023-01-12
 * @LastEditors: anjiang
 * @LastEditTime: 2023-01-12
 * @Description: 自己实现下载
 */
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const qnMap = {
	"4K": 120,
	"1080p+": 112,
	"1080p": 80,
	"720p": 64,
	"480p": 32,
	"360p": 16,
};

const cookie =
	"buvid3=3A3FD82E-4769-3A48-EABD-2117F8DFD43729255infoc; b_nut=1671124329; _uuid=63D942102-B10101-7F14-8394-F85672957DE629787infoc; buvid4=3F0B17B9-B45E-DA14-927E-13E941246BE530150-022121601-E2YYgsiSOsqePeqyGOJElQ%3D%3D; rpdid=|(~uklJJYk|0J'uY~uukRJJ|; CURRENT_QUALITY=16; buvid_fp_plain=undefined; i-wanna-go-back=-1; fingerprint=b8563305eb8377443998e3e6a812f019; SESSDATA=f29b7a3a%2C1689066381%2C0d0d9%2A12; bili_jct=1fa65b1aa0e77dfd0b7e77a725c8da95; DedeUserID=377687892; DedeUserID__ckMd5=cfaa46673833571f; sid=5aqcr4al; buvid_fp=6f969c11d1c33b99e5816f6c95049271; b_ut=5; is-2022-channel=1; b_lsid=EDC69B8C_185A64142CA; nostalgia_conf=-1; bp_video_offset_377687892=750263866930233300; innersign=1; CURRENT_BLACKGAP=0; PVID=3; CURRENT_FNVAL=16";

/**
 * @description: 获取bvid
 * @param {*} url
 * @return {*} bvid
 */
const getBvid = (url) => {
	const urlList = url.split("/");
	return urlList.filter((item) => item.startsWith("BV"))?.[0];
};

const getRefererByBvid = (bvid) => `https://www.bilibili.com/video/${bvid}`;

/**
 * @description: 根据 UP 主页 URL 获取 mid
 * mid 是每个 B 站用户的唯一标识。同样为了方便理解和使用，
 * 暴露的接口使用 UP 主页 URL，进行字符串处理获取 mid：
 * @param {*} url
 * @return {*}
 */
const getMidByUrl = (url) => {
	const reg = /space.bilibili.com\/(?<mid>\d+)/;
	return url.match(reg).groups?.mid;
};

/**
 * @description: 根据 up 主 mid 获取视频主页地址
 * @param {*} mid
 * @param {*} currentPage
 * @return {*}
 */
const getHomeUrl = (mid, currentPage) =>
	`https://api.bilibili.com/x/space/arc/search?mid=${mid}&ps=30&pn=${currentPage}`;

/**
 * @description: 根据bvid获取cid数组
 * 对于多p视频，仅通过bvid无法确定请求的是哪一p视频，
 * 此时 cid 起到了唯一标识视频的作用。通过浏览器抓包分析接口，可知获取 cid 的方法为：
 * @return {*} { cidList: string[], title: string }
 */
const getCidTitleByBvid = async (bvid) => {
	const res = await axios.get("https://api.bilibili.com/x/web-interface/view", {
		headers: {
			cookie,
		},
		params: {
			bvid,
		},
	});
	return {
		cidList: res.data.data.pages.map((item) => item.cid),
		title: res.data.data.title,
	};
};

/**
 * @description: 根据bvid获取视频下载地址数组
 * @param {*} bvid
 * @param {*} type "mp4" | "mp3"
 * @return {*} string[]
 */
const getDownloadPathById = async (bvid, type, qn) => {
	const { cidList = [], title = "" } = await getCidTitleByBvid(bvid);
	const result = [];
	for (const cid of cidList) {
		const params = {
			bvid,
			cid,
			qn: qnMap[qn],
		};
		if (type === "mp3") {
			// fnval设为 16 时，音视频将会分离，此时可以达到只下载音频的目的
			params.fnval = 16;
		}
		const res = await axios.get("https://api.bilibili.com/x/player/playurl", {
			headers: {
				cookie,
			},
			params,
		});
		result.push(
			type === "mp3"
				? res.data.data.dash.audio[0].baseUrl
				: res.data.data?.durl?.[0]?.url
		);
	}
	return result;
};

/**
 * @description: 根据下载地址下载资源
 * getDownloadPathById返回的是下载地址，但直接在浏览器打开会报错，
 * 这是因为 request header 必须带有 referer 字段。
 * 通过抓包可知， referer 字段取值就是视频地址
 * @param {*} url 路径
 * @param {*} referer headers
 * @param {*} folder
 * @param {*} title 视频标题
 * @param {*} type 下载类型
 * @return {*} Promise
 */
const downloadResource = async ({ url, folder, title, type }) => {
	const target = path.join(folder, `${title}.${type}`);
	if (fs.existsSync(target)) {
		console.log(`视频 ${title} 已存在`);
		return Promise.resolve();
	}
	const res = await axios.get(url, {
		headers: {
			referer: getRefererByBvid(getBvid(url)),
			cookie,
		},
		responseType: "stream",
	});
	console.log(`开始下载：${title}.${type}`);
	const writer = fs.createWriteStream(target);
	res.data.pipe(writer);
	return new Promise((resolve, reject) => {
		writer.on("finish", resolve);
		writer.on("error", reject);
	});
};

/** 通过作品地址下载 */
const downloadByUrl = async (url, type, qn = "1080p+", folder = "") => {
	const bvid = getBvid(url);
	const { cidList, title } = await getCidTitleByBvid(bvid);
	const result = await getDownloadPathById(bvid, type, qn);
	await downloadResource({
		url: result?.[0],
		folder,
		title,
		type,
	});
};

/** 通过up主页地址下载 */
const downLoadByUpUrl = async (url) => {
	const res = await getMidByUrl(url);
};

module.exports = {
	downloadByUrl,
};
