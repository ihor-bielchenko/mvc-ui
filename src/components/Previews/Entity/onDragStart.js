
const onDragStart = (e, options) => {
	options
		.node
		.parentNode
		.childNodes
		.forEach((node) => (node.style.zIndex = '1'));
	options
		.node
		.style
		.zIndex = '2';
};

export default onDragStart;
