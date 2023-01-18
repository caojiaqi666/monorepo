/*
 * @Author: anjiang
 * @Date: 2023-01-17
 * @LastEditors: anjiang
 * @LastEditTime: 2023-01-18
 * @Description:
 */
import React, { useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { downloadByUrl } from "../../api/index";
import "./index.css";

function App() {
	const { Option } = Select;

	const qnMap = ["4K", "1080p+", "1080p", "720p", "480p", "360p"];

	const download = async (data) => {
		const res = await downloadByUrl({
			...data,
			path: "./public",
		});
		console.log("res: ", res);
		message.info("正在下载，请稍候～");
		if (res?.data?.state === "200") {
			message.success("下载成功，2s后将为您跳转～");
			setTimeout(() => {
				window.open(decodeURIComponent(res?.data.url), "__blank");
			}, 2000);
		} else {
			message.error("下载失败" + JSON.stringify(res?.data?.msg));
		}
	};

	const onFinish = (values) => {
		download(values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	const onTypeChange = () => {};

	const onQnChange = () => {};
	return (
		<div className="App">
			<div className="downloadWrap">
				<Form
					style={{ width: "50vw" }}
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						label="bilibili视频地址"
						name="url"
						rules={[{ required: true, message: "请输入视频地址!" }]}
					>
						<Input placeholder="请输入视频地址" />
					</Form.Item>

					<Form.Item
						label="下载类型"
						name="type"
						rules={[{ required: true, message: "请选择下载类型!" }]}
					>
						<Select
							placeholder="请选择下载类型"
							onChange={onTypeChange}
							allowClear
						>
							<Option value="mp4">视频</Option>
							<Option value="mp3">音频</Option>
						</Select>
					</Form.Item>

					<Form.Item
						label="视频清晰度"
						name="qn"
						rules={[{ required: true, message: "请选择视频清晰度!" }]}
					>
						<Select
							placeholder="请选择视频清晰度"
							onChange={onQnChange}
							allowClear
						>
							{qnMap.map((item, index) => (
								<Option key={index} value={item}>
									{item}
								</Option>
							))}
						</Select>
					</Form.Item>

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							下载
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}

export default App;
