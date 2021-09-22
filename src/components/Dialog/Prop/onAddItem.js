import Store from 'components/Store';
import { 
	FORMAT_ATOMIC,
	FORMAT_OBJ, 
} from 'structures/format.js';
import { COLUMN_TEXT } from 'structures/columnTypes.js';
import getNewItemKey from './getNewItemKey.js';

const onAddItem = (e) => {
	const prop = Store().getState().prop;
	const key = getNewItemKey(prop.body);

	if (prop.format_id === FORMAT_ATOMIC.id || !prop.format_id) {
		prop.format_id = FORMAT_OBJ.id;
	}

	prop.body[Date.now()] = {
		type_id: COLUMN_TEXT.id,
		key,
		value: '',
	};
	Store().dispatch({
		type: 'prop',
		payload: () => ({ ...prop }),
	});
};

export default onAddItem;
