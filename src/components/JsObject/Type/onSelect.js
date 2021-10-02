import Store from 'components/Store';
import {
	COLUMN_OBJ,
	COLUMN_ARR,
} from 'structures/columnTypes.js';
import getDefaultValueByTypeId from '../getDefaultValueByTypeId.js';

const onSelect = (e, id) => {
	const jsObject = Store().getState().jsObject;
	
	if (typeof jsObject.data[id] === 'object') {
		jsObject.data[id].type_id = Number(e.target.value);
		jsObject.data[id]['value'] = getDefaultValueByTypeId(jsObject.data[id].type_id);
		
		if (jsObject.data[id].type_id === COLUMN_ARR.id
			|| jsObject.data[id].type_id === COLUMN_OBJ.id) {
			if (!Array.isArray(jsObject.blocks[id])) {
				jsObject.blocks[id] = [];
			}
		}
		else if (jsObject.blocks[id]) {
			delete jsObject.blocks[id];
		}

		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onSelect;
