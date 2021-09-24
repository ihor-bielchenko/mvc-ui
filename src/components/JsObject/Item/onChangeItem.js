import Store from 'components/Store';
import { COLUMN_TEXT } from 'structures/columnTypes.js';

const onChangeItem = (e, id, key = 'key', itemObj = {}) => {
	const jsObject = Store().getState().jsObject;
	
	if (typeof jsObject.temp[id] === 'undefined') {
		jsObject.temp[id] = {
			id,
			type_id: COLUMN_TEXT.id,
			key: '',
			value: '',
			...itemObj,
		};
	}
	jsObject.temp[id][key] = e.target.value;
	
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onChangeItem;
