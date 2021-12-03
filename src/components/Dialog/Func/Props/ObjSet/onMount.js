import Store from 'components/Store';
import getTemplate from 'components/JsObject/getTemplate.js';
import buildBlocks from 'components/JsObject/buildBlocks.js';
import { 
	DATA_TYPE_OBJECT,
	DATA_TYPE_TEXT,
} from 'structures/dataTypes.js';

const onMount = (scriptId = 0) => {
	const jsObject = Store().getState().jsObject;
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
	jsObject.data[++_id] = getTemplate({
		id: _id,
		parent_id: 0,
		key: '0',
		value: ({ ...(([ ...(blocks[0] || []) ])[0] || {}) }).value || '',
		data_type_id: DATA_TYPE_OBJECT.id,
	});
	jsObject.data[++_id] = getTemplate({
		id: _id,
		parent_id: 0,
		key: '1',
		value: ({ ...(([ ...(blocks[0] || []) ])[1] || {}) }).value || '',
		data_type_id: DATA_TYPE_TEXT.id,
	});
	jsObject.data[++_id] = getTemplate({
		id: _id,
		parent_id: 0,
		key: '2',
		value: ({ ...(([ ...(blocks[0] || []) ])[2] || {}) }).value || '',
		data_type_id: DATA_TYPE_TEXT.id,
	});
	jsObject.blocks = {};

	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...buildBlocks(jsObject) }),
	});
};

export default onMount;
