import Store from 'components/Store';
import { FORMAT_ATOMIC } from 'structures/format.js';
import { COLUMN_ARR } from 'structures/columnTypes.js';

const onSelectFormatId = (e) => {
	const newValue = Number(e.target.value);
	const {
		prop,
		jsObject,
	} = Store().getState();
	const dataIds = Object.keys(jsObject.data);

	if (newValue === FORMAT_ATOMIC.id) {
		jsObject.data = {
			[dataIds[0]]: jsObject.data[dataIds[0]],
		};
	}
	else if (newValue === COLUMN_ARR.id) {
		dataIds.forEach((id, index) => (jsObject.data[id].key = index.toString()));
	}

	prop.format_id = newValue;
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
	Store().dispatch({
		type: 'prop',
		payload: () => ({ ...prop }),
	});
};

export default onSelectFormatId;
