import Store from 'components/Store';
import { FORMAT_ARR } from 'structures/format.js';

const onDeleteItem = (e, id) => {
	const prop = Store().getState().prop;

	if (typeof prop.body[id] !== 'undefined') {
		delete prop.body[id];

		const bodyIds = Object.keys(prop.body);

		if (bodyIds.length === 1) {
			prop.body[bodyIds[0]].key = '0';
		}
		else if (prop.format_id === FORMAT_ARR.id) {
			bodyIds.forEach((id, index) => prop.body[id].key = index.toString());
		}

		Store().dispatch({
			type: 'prop',
			payload: () => ({ ...prop }),
		});
	}
};

export default onDeleteItem;
