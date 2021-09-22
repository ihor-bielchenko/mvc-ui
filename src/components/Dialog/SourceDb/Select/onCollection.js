import Store from 'components/Store';
import {
	FORMAT_ATOMIC,
	FORMAT_OBJ,
	FORMAT_ARR,
} from 'structures/format.js';

const onCollection = (e, id) => {
	const prop = Store().getState().prop;

	prop.tempValue['is_collection'] = !prop.tempValue['is_collection'];

	if (typeof prop.body[id] === 'object') {
		if ((prop.tempValue['select'] || []).length > 0) {
			if (prop.format_id === FORMAT_ATOMIC.id) {
				prop.format_id = FORMAT_OBJ.id;
			}
			else {
				prop.body[id].type_id = FORMAT_OBJ.id;
			}
		}
		if (prop.tempValue['is_collection']) {
			if (prop.format_id === FORMAT_ATOMIC.id) {
				prop.format_id = FORMAT_ARR.id;
			}
			else {
				prop.body[id].type_id = FORMAT_ARR.id;
			}
		}
	}
	Store().dispatch({
		type: 'prop',
		payload: () => ({ ...prop }),
	});
};

export default onCollection;
