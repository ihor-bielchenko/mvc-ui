import getTemplate from './getTemplate.js';
import getDefaultValueByTypeId from './getDefaultValueByTypeId.js';

const buildBlocks = (jsObject = { data: {}, blocks: {} }) => {
	const data = jsObject.data;
	const blocks = jsObject.blocks;
	const dataKeys = Object.keys(data);
	let i = 0,
		tmp = {};

	while (i < dataKeys.length) {
		const _id = dataKeys[i];

		data[_id] = getTemplate({
			parent_id: data[_id].parent_id,
			value: getDefaultValueByTypeId(data[_id].data_type_id),
			...data[_id],
		});

		if (!tmp[_id]) {
			tmp[_id] = { ...data[_id] };
		}
		if (data[_id].parent_id >= 0 
			&& (typeof blocks[data[_id].parent_id] !== 'object'
				|| !blocks[data[_id].parent_id])) {
			blocks[data[_id].parent_id] = [];
		}
		if (data[_id].parent_id > 0) {
			if (data[data[_id].parent_id]) {
				if (!tmp[data[_id].parent_id]) {
					tmp[data[_id].parent_id] = { ...data[data[_id].parent_id] };
				}
				if (typeof tmp[data[_id].parent_id].value !== 'object'
					|| !tmp[data[_id].parent_id].value) {
					tmp[data[_id].parent_id].value = {};
				}
				// tmp[data[_id].parent_id].value[_id] = tmp[_id];
				blocks[data[_id].parent_id].push(data[_id]);
			}
		}
		else if (Array.isArray(blocks[data[_id].parent_id])) {
			blocks[data[_id].parent_id].push(data[_id]);
		}
		i++;
	}
	tmp = undefined;
	jsObject.data = data;
	jsObject.blocks = blocks;
	jsObject.renderFlag = true;

	return jsObject;
};

export default buildBlocks;

