/*
 * @Author: anjiang
 * @Date: 2023-02-01
 * @LastEditors: anjiang
 * @LastEditTime: 2023-02-01
 * @Description:
 */
const fs = require("fs");
const parser = require("@babel/parser");
const path = require("path");
const traverse = require("@babel/traverse").default;
const babel = require("@babel/core");

const getModuleInfo = (file) => {
	const body = fs.readFileSync(file, "utf-8");
	const ast = parser.parse(body, {
		sourceType: "module",
	});
	const deps = {};
	traverse(ast, {
		ImportDeclaration({ node }) {
			const dirname = path.dirname(file);
			const abspath = "./" + path.join(dirname, node.source.value);
			deps[node.source.value] = abspath;
		},
	});

	const { code } = babel.transformFromAst(ast, null, {
		presets: ["@babel/preset-env"],
	});
	console.log("code: ", code);

	const moduleInfo = { file, deps, code };
	console.log("moduleInfo: ", moduleInfo);

	return moduleInfo;
};

getModuleInfo("./src/index.js");
