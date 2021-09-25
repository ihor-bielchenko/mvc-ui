import Store from 'components/Store';
import getNewItemKey from './getNewItemKey.js';
import { COLUMN_TEXT } from 'structures/columnTypes.js';

const onAddItem = (e, id) => {
	const jsObject = Store().getState().jsObject;
	const newId = Date.now();
	const newItem = {
		parent_id: id,
		id: newId,
		type_id: COLUMN_TEXT.id,
		key: getNewItemKey(jsObject.blocks[id]),
		value: '',
		lengthIsUndefined: false,
		disabled: false,
		source: {
			key: undefined,
			value: undefined,
		},
	};

	jsObject.data[newId] = newItem;
	jsObject.blocks[id].push(jsObject.data[newId]);

	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onAddItem;
