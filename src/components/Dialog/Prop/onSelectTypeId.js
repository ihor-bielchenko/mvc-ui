import Store from 'components/Store';
import {
	FORMAT_ATOMIC,
	FORMAT_OBJ,
	FORMAT_ARR,
} from 'structures/format.js';
import { COLUMN_TEXT } from 'structures/columnTypes.js';

const onSelectTypeId = (e, id) => {
	const prop = Store().getState().prop;

	if (prop.body[id]) {
		prop.body[id].type_id = Number(e.target.value);
		prop.body[id].value = '';

		if (Object.keys(prop.body).length === 1 
			&& prop.format_id === FORMAT_ATOMIC.id) {
			prop.format_id = prop.body[id].type_id === FORMAT_OBJ.id
				? FORMAT_OBJ.id
				: prop.body[id].type_id === FORMAT_ARR.id
					? FORMAT_ARR.id
					: prop.format_id;
			prop.body[id].type_id = COLUMN_TEXT.id;
		}
		Store().dispatch({
			type: 'prop',
			payload: () => ({ ...prop }),
		});
	}
};

export default onSelectTypeId;
