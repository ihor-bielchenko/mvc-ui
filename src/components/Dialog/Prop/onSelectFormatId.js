import Store from 'components/Store';
import { FORMAT_ATOMIC } from 'structures/format.js';
import { 
	COLUMN_ARR,
	COLUMN_TEXT, 
} from 'structures/columnTypes.js';

const onSelectFormatId = (e) => {
	const newValue = Number(e.target.value);
	const jsObject = Store().getState().jsObject;
	const newId = Date.now();

	if (newValue === FORMAT_ATOMIC.id && jsObject.blocks[0][0].type_id !== COLUMN_TEXT.id) {
		jsObject.data = {
			0: jsObject.data[0],
			[newId]: {
				parent_id: 0,
				id: newId,
				type_id: COLUMN_TEXT.id,
				key: '0',
				value: '',
			},
		};
		jsObject.blocks = {
			0: [ jsObject.data[newId] ],
		};
	}
	else if (newValue === COLUMN_ARR.id 
		&& jsObject.blocks[0]) {
		jsObject
			.blocks[0]
			.forEach((item, index) => {
				return (jsObject.blocks[0][index].key = index.toString());
			});
	}

	jsObject.data[0].type_id = newValue;
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onSelectFormatId;
