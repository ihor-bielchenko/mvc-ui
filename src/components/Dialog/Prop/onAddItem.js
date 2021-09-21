import Store from 'components/Store';
import { 
	FORMAT_ATOMIC,
	FORMAT_OBJ, 
} from 'structures/format.js';

const getNewKey = (body, key) => {
	const bodyIds = Object.keys(body);
	const newKey = key ?? bodyIds.length;
	const newKeyNumber = Number(newKey);
	const newKeyString = newKey.toString();
	const findIndex = bodyIds.findIndex((id) => body[id].key === newKeyString);

	if (findIndex > -1 && !Number.isNaN(newKeyNumber)) {
		return getNewKey(body, newKeyNumber + 1);
	}
	return newKeyString;
};
const onAddItem = (e) => {
	const prop = Store().getState().prop;
	const key = getNewKey(prop.body);

	if (prop.format_id === FORMAT_ATOMIC.id || !prop.format_id) {
		prop.format_id = FORMAT_OBJ.id;
	}

	console.log('prop', prop);

	prop.body[Date.now()] = {
		type_id: '',
		key,
		value: '',
	};
	Store().dispatch({
		type: 'prop',
		payload: () => ({ ...prop }),
	});
};

export default onAddItem;
