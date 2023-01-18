/*
 * @Author: anjiang
 * @Date: 2023-01-17
 * @LastEditors: anjiang
 * @LastEditTime: 2023-01-18
 * @Description:
 */
import axios from "axios";
// 通过链接下载视频
const serveUrl = "http://114.115.181.249:9529";
// const serveUrl = "http://localhost:9529";
export const downloadByUrl = (data) => {
	return axios({
		method: "post",
		url: `${serveUrl}/downloadBi`,
		data,
	});
};
