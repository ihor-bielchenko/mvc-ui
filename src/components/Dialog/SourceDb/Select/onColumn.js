import Store from 'components/Store';
import {
	FORMAT_ATOMIC,
	FORMAT_OBJ,
	FORMAT_ARR,
} from 'structures/format.js';

const onColumn = (e, id) => {
	const target = e.target;
	const checked = target.checked;
	const value = Number(target.value);

	if (value > 0) {
		const prop = Store().getState().prop;
		const select = [ ...(prop.tempValue.select || []) ];
		const findIndex = select.findIndex((id) => id === value);

		if (checked && findIndex === -1) {
			select.push(value);
		}
		else if (!checked && findIndex >= 0) {
			select.splice(findIndex, 1);
		}
		prop.tempValue.select = select;

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
	}
};

export default onColumn;
