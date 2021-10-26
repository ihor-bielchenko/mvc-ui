import Store from 'components/Store';
import { SOURCE_TYPE_DB } from 'structures/sourceTypes.js';
import { 
	DATA_TYPE_ATOMIC,
	DATA_TYPE_ARRAY,
	DATA_TYPE_OBJECT,
	DATA_TYPE_TEXT, 
} from 'structures/dataTypes.js';

const onSelectDataTypeId = (e) => {
	const newValue = Number(e.target.value);
	const jsObject = Store().getState().jsObject;
	const newId = Date.now();

	if (newValue === DATA_TYPE_ATOMIC.id && jsObject.blocks[0][0].data_type_id !== DATA_TYPE_TEXT.id) {
		jsObject.data = {
			0: jsObject.data[0],
			[newId]: {
				parent_id: 0,
				id: newId,
				data_type_id: DATA_TYPE_TEXT.id,
				key: '0',
				value: '',
			},
		};
		jsObject.blocks = {
			0: [ jsObject.data[newId] ],
		};
	}
	else if (newValue === DATA_TYPE_ARRAY.id && jsObject.blocks[0]) {
		let offset = 0;

		jsObject.blocks[0].forEach((item, i) => {
			if (item.data_type_id === DATA_TYPE_OBJECT.id 
				&& typeof item.value === 'object'
				&& item.value.source_type_id === SOURCE_TYPE_DB.id
				&& typeof item.value.columns === 'object') {
				const columnKeys = Object.keys(item.value.columns);

				jsObject.blocks[0][i].key = i + offset;
				columnKeys.forEach((key, ii) => {
					jsObject.blocks[0][i].value.columns[key] = (ii + jsObject.blocks[0][i].key).toString();
				});
				jsObject.blocks[0][i].key = jsObject.blocks[0][i].key.toString();
				offset += (columnKeys.length - 1);
			}
			else {
				jsObject.blocks[0][i].key = (i + offset).toString();
			}
		});
	}
	else if (newValue === DATA_TYPE_OBJECT.id && jsObject.blocks[0]) {
		jsObject.blocks[0].forEach((item, i) => {
			if (jsObject.blocks[0][i].key.includes('n+')) {
				jsObject.blocks[0][i].key = i.toString();
			}
			else if (jsObject.blocks[0][i].key.includes('n')) {
				jsObject.blocks[0][i].disabledKey = true;
			}
		});
	}
	jsObject.data[0].data_type_id = newValue;

	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onSelectDataTypeId;
