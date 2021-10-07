import Store from 'components/Store';
import getTemplate from '../getTemplate.js';
import generateKey from '../generateKey.js';

// TODO: одинаковые ключи
const onAddItem = (e, id) => {
	const jsObject = Store().getState().jsObject;
	const newId = Date.now();
	const newItem = getTemplate({
		parent_id: id,
		id: newId,
		key: generateKey(jsObject.blocks[id]),
	});

	jsObject.data[newId] = newItem;
	jsObject.blocks[id].push(jsObject.data[newId]);

	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onAddItem;
