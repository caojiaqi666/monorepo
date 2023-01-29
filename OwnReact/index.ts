// const element = <h1 title="foo">Hello</h1>
// jsx通常是用babel转译成js的，本质是调用了React.createElement
// 然后就会变成下面这样

const element = {
	type: "h1",
	props: {
		title: "foo",
		children: "Hello",
	},
};

const container = document.getElementById("root");

// ReactDOM.render(element, container)
// 我们现在想实现将节点插入到container容器里

// 创建一个h1标签
const node = document.createElement(element.type);
node["title"] = element.props.title;

// 创建一个文本，插入到container容器
const text = document.createTextNode("");

text["nodeValue"] = element.props.children;

node.appendChild(text);

container.appendChild(node);

{
	/** -------分界线------ **/
}

// createElement功能
// function createElement(type, props, ...children) {
// 	return {
// 		type,
// 		props: {
// 			...props,
// 			children,
// 		},
// 	};
// }

// 我们需要让返回的props的children返回的是一个数组,像这样
// createElement("div", null, a, b)
// {
//   "type": "div",
//   "props": { "children": [a, b] }
// }
function createElement(type, props, ...children) {
	return {
		type,
		props: {
			...props,
			children: children.map((child) =>
				typeof child === "object" ? child : createElement(child, null)
			),
		},
	};
}

function createTextElement(text) {
	return {
		type: "TEXT_ELEMENT",
		props: {
			nodeValue: text,
			children: [],
		},
	};
}

const MyReact = {
	createElement,
};

const element1 = MyReact.createElement(
	"div",
	{ id: "foo" },
	MyReact.createElement("a", null, "bar"),
	MyReact.createElement("b", null)
);

/* @jsx Didact.createElement */
// const element = (
//   <div id="foo">
//     <a>bar</a>
//     <b />
//   </div>
// )