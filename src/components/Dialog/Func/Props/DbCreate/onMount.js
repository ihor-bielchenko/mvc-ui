import Store from 'components/Store';
import getTemplate from 'components/JsObject/getTemplate.js';
import buildBlocks from 'components/JsObject/buildBlocks.js';
import { DATA_TYPE_OBJECT } from 'structures/dataTypes.js';

const onMount = (scriptId = 0) => {
	const {
		jsObject,
		db,
	} = Store().getState();
	const blocks = jsObject.blocks;
	let _id = Date.now();

	jsObject.data = {};
	jsObject.data[0] = jsObject.data[0] ?? getTemplate({
		parent_id: undefined,
		key: 0,
		value: undefined,
		data_type_id: DATA_TYPE_OBJECT.id,
		...typeof jsObject.data[0] === 'object'
			? jsObject.data[0]
			: {},
	});

	Object
		.keys(db.columns)
		.forEach((key, index) => {
			jsObject.data[++_id] = getTemplate({
				id: _id,
				parent_id: 0,
				key: db.columns[key].name,
				value: ({ ...(([ ...(blocks[0] || []) ])[index] || {}) }).value || '',
				data_type_id: db.columns[key].data_type_id,
			});
	});
	jsObject.blocks = {};

	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...buildBlocks(jsObject) }),
	});
};

export default onMount;
