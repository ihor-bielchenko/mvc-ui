import Store from 'components/Store';

const onMount = (typeId) => {
	const jsObject = Store().getState().jsObject;
	const data = jsObject.data;
	const dataKeys = Object.keys(data);
	let i = 0,
		tmp = {},
		blocks = {};

	jsObject.data[0] = jsObject.data[0] ?? ({
		id: 0,
		key: 0,
		value: undefined,
		type_id: typeId,
		lengthIsUndefined: false,
		disabled: false,
		source: {
			key: undefined,
			value: undefined,
		},
		...typeof jsObject.data[0] === 'object'
			? jsObject.data[0]
			: {},
	});
	while (i < dataKeys.length) {
		const _id = dataKeys[i];

		data[_id] = {
			lengthIsUndefined: false,
			disabled: false,
			source: {
				key: undefined,
				value: undefined,
			},
			...data[_id],
		};

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
				tmp[data[_id].parent_id].value[_id] = tmp[_id];
				blocks[data[_id].parent_id].push(data[_id]);
			}
		}
		else if (Array.isArray(blocks[data[_id].parent_id])) {
			blocks[data[_id].parent_id].push(data[_id]);
		}
		i++;
	}
	tmp = undefined;
	jsObject.blocks = blocks;

	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onMount;
