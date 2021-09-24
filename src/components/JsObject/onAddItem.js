import Store from 'components/Store';
import getNewItemKey from './getNewItemKey.js';
import { 
	COLUMN_TEXT,
	COLUMN_OBJ,
	COLUMN_ARR, 
} from 'structures/columnTypes.js';

const recursion = (data, temp, id) => {
	const dataKeys = Object.keys(data);
	let i = 0;

	if (typeof id === 'undefined') {
		const newKey = getNewItemKey(data);
		const newId = Date.now();

		data[newId] = {
			id: newId,
			type_id: COLUMN_TEXT.id,
			key: newKey,
			value: '',
		};
		return ({ ...data });
	}


	while (i < dataKeys.length) {
		if ((temp[dataKeys[i]] || {}).type_id === COLUMN_OBJ.id
			|| (temp[dataKeys[i]] || {}).type_id === COLUMN_ARR.id
			|| (data[dataKeys[i]] || {}).type_id === COLUMN_OBJ.id
			|| (data[dataKeys[i]] || {}).type_id === COLUMN_ARR.id) {
			if (id === dataKeys[i]) {
				if (temp[id]) {
					data[id] = { ...temp[id] };
				}
				const newKey = getNewItemKey(data[id].value);
				const newId = Date.now();

				data[id].value[newId] = {
					parent_id: id,
					id: newId,
					type_id: COLUMN_TEXT.id,
					key: newKey,
					value: '',
				};
				break;
			}
			else if (typeof data[dataKeys[i]].value === 'object') {
				data[dataKeys[i]].value = recursion(data[dataKeys[i]].value, temp, id);
				break;
			}
		}
		i++;
	}
	return ({ ...data });
};

const onAddItem = (e, id) => {
	const jsObject = Store().getState().jsObject;

	jsObject.data = recursion(jsObject.data, jsObject.temp, id);
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onAddItem;
