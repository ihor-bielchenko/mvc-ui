import Store from 'components/Store';
import {
	COLUMN_OBJ,
	COLUMN_ARR,
} from 'structures/columnTypes.js';
import { SOURCE_DB } from 'structures/source.js';
import getDefaultValueByTypeId from '../getDefaultValueByTypeId.js';

const onSelect = (e, id) => {
	const jsObject = Store().getState().jsObject;
	const data = jsObject.data;
	const blocks = jsObject.blocks;
	const currentItem = data[id];
	
	if (typeof currentItem === 'object') {
		currentItem.type_id = Number(e.target.value);
		currentItem.value = getDefaultValueByTypeId(currentItem.type_id);

		if (currentItem.type_id === COLUMN_ARR.id) {
			let offset = 0;

			blocks[id] = (blocks[id] ?? []);
			blocks[id].forEach((item, i) => {
				if (item.type_id === COLUMN_OBJ.id 
					&& typeof item.value === 'object'
					&& item.value.source_id === SOURCE_DB.id
					&& typeof item.value.columns === 'object') {
					const columnKeys = Object.keys(item.value.columns);

					blocks[id][i].key = i + offset;
					columnKeys.forEach((key, ii) => {
						blocks[id][i].value.columns[key] = (ii + blocks[id][i].key).toString();
					});
					blocks[id][i].key = blocks[id][i].key.toString();
					offset += (columnKeys.length - 1);
				}
				else {
					blocks[id][i].key = (i + offset).toString();
				}
			});
		}
		else if (currentItem.type_id === COLUMN_OBJ.id) {
			blocks[id] = (blocks[id] ?? []);
		}
		else if (blocks[id]) {
			delete blocks[id];
		}

		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onSelect;
