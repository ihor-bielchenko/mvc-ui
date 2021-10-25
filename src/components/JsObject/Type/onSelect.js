import Store from 'components/Store';
import {
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
} from 'structures/dataTypes.js';
import { SOURCE_TYPE_DB } from 'structures/sourceTypes.js';
import getDefaultValueByTypeId from '../getDefaultValueByTypeId.js';

const onSelect = (e, id) => {
	const jsObject = Store().getState().jsObject;
	const data = jsObject.data;
	const blocks = jsObject.blocks;
	const currentItem = data[id];
	
	if (typeof currentItem === 'object') {
		currentItem.data_type_id = Number(e.target.value);
		currentItem.value = getDefaultValueByTypeId(currentItem.data_type_id);

		if (currentItem.data_type_id === DATA_TYPE_ARRAY.id) {
			let offset = 0;

			blocks[id] = (blocks[id] ?? []);
			blocks[id].forEach((item, i) => {
				if (item.data_type_id === DATA_TYPE_OBJECT.id 
					&& typeof item.value === 'object'
					&& item.value.source_type_id === SOURCE_TYPE_DB.id
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
		else if (currentItem.data_type_id === DATA_TYPE_OBJECT.id) {
			blocks[id] = (blocks[id] ?? []);
			blocks[id].forEach((item, i) => {
				if (blocks[id][i].key.includes('n+')) {
					blocks[id][i].key = i.toString();
				}
				else if (blocks[id][i].key.includes('n')) {
					blocks[id][i].disabledKey = true;
				}
			});
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
