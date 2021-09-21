import Store from 'components/Store';
import { 
	FORMAT_ATOMIC,
	FORMAT_ARR, 
} from 'structures/format.js';

const onSelectFormatId = (e) => {
	const newValue = Number(e.target.value);
	const prop = Store().getState().prop;
	const bodyIds = Object.keys(prop.body);

	if (newValue === FORMAT_ATOMIC.id) {
		prop.body = {
			[bodyIds[0]]: prop.body[bodyIds[0]],
		};
	}
	else if (newValue === FORMAT_ARR.id) {
		bodyIds.forEach((id, i) => (prop.body[id].key = i));
	}

	prop.format_id = newValue;
	Store().dispatch({
		type: 'prop',
		payload: () => ({ ...prop }),
	});
};

export default onSelectFormatId;
