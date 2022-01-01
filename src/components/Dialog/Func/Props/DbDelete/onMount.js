import Store from 'components/Store';
import getTemplate from 'components/JsObject/getTemplate.js';
import buildBlocks from 'components/JsObject/buildBlocks.js';
import { 
	DATA_TYPE_OBJECT,
	DATA_TYPE_TEXT, 
	DATA_TYPE_NUMBER,
} from 'structures/dataTypes.js';

const onMount = (scriptId = 0) => {
	const jsObject = Store().getState().jsObject;
	const blocks = jsObject.blocks;
	const filter = ({ ...(([ ...(blocks[0] || []) ])[1] || {}) }).value || '{}';
	const sort = ({ ...(([ ...(blocks[0] || []) ])[2] || {}) }).value || '{}';
	const query = ({ ...(([ ...(blocks[0] || []) ])[3] || {}) }).value || '{}';
	const filterOperatorId = ({ ...(([ ...(blocks[0] || []) ])[4] || {}) }).value || process.env.OPERATOR_UNION_AND;
	let _id = Date.now();

	if (!jsObject.tempValue) {
		jsObject.tempValue = {};
	}
	jsObject.tempValue.filter = JSON.parse(filter);
	jsObject.tempValue.sort = JSON.parse(sort);
	jsObject.tempValue.query = JSON.parse(query);
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
		data_type_id: DATA_TYPE_NUMBER.id,
	});
	jsObject.data[++_id] = getTemplate({
		id: _id,
		parent_id: 0,
		key: '1',
		value: filter,
		data_type_id: DATA_TYPE_TEXT.id,
	});
	jsObject.data[++_id] = getTemplate({
		id: _id,
		parent_id: 0,
		key: '2',
		value: sort,
		data_type_id: DATA_TYPE_TEXT.id,
	});
	jsObject.data[++_id] = getTemplate({
		id: _id,
		parent_id: 0,
		key: '3',
		value: query,
		data_type_id: DATA_TYPE_TEXT.id,
	});
	jsObject.data[++_id] = getTemplate({
		id: _id,
		parent_id: 0,
		key: '4',
		value: filterOperatorId,
		data_type_id: DATA_TYPE_NUMBER.id,
	});
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...buildBlocks(jsObject) }),
	});
};

export default onMount;
