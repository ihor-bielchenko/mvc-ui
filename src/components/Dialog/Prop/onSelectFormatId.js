import Store from 'components/Store';
import { FORMAT_ATOMIC } from 'structures/format.js';
import { SOURCE_DB } from 'structures/source.js';
import { 
	COLUMN_ARR,
	COLUMN_OBJ,
	COLUMN_TEXT, 
} from 'structures/columnTypes.js';

const onSelectFormatId = (e) => {
	const newValue = Number(e.target.value);
	const jsObject = Store().getState().jsObject;
	const data = jsObject.data;
	const blocks = jsObject.blocks;
	const newId = Date.now();

	if (newValue === FORMAT_ATOMIC.id && blocks[0][0].type_id !== COLUMN_TEXT.id) {
		jsObject.data = {
			0: data[0],
			[newId]: {
				parent_id: 0,
				id: newId,
				type_id: COLUMN_TEXT.id,
				key: '0',
				value: '',
			},
		};
		jsObject.blocks = {
			0: [ data[newId] ],
		};
	}
	else if (newValue === COLUMN_ARR.id && blocks[0]) {
		let offset = 0;

		blocks[0].forEach((item, i) => {
			if (item.type_id === COLUMN_OBJ.id 
				&& typeof item.value === 'object'
				&& item.value.source_id === SOURCE_DB.id
				&& typeof item.value.columns === 'object') {
				const columnKeys = Object.keys(item.value.columns);

				blocks[0][i].key = i + offset;
				columnKeys.forEach((key, ii) => {
					blocks[0][i].value.columns[key] = (ii + blocks[0][i].key).toString();
				});
				blocks[0][i].key = blocks[0][i].key.toString();
				offset += (columnKeys.length - 1);
			}
			else {
				blocks[0][i].key = (i + offset).toString();
			}
		});
	}
	else if (newValue === COLUMN_OBJ.id && blocks[0]) {
		blocks[0].forEach((item, i) => {
			if (blocks[0][i].key.includes('n+')) {
				blocks[0][i].key = i.toString();
			}
			else if (blocks[0][i].key.includes('n')) {
				blocks[0][i].disabledKey = true;
			}
		});
	}

	jsObject.data[0].type_id = newValue;
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onSelectFormatId;
