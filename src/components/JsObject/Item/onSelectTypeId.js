import Store from 'components/Store';
import getDefaultValueByTypeId from '../getDefaultValueByTypeId.js';

const onSelectTypeId = (e, id) => {
	const jsObject = Store().getState().jsObject;
	
	if (typeof jsObject.temp[id] === 'undefined') {
		jsObject.temp[id] = {
			id,
			key: '',
			value: '',
		};
	}
	jsObject.temp[id]['type_id'] = Number(e.target.value);
	jsObject.temp[id]['value'] = getDefaultValueByTypeId(jsObject.temp[id]['type_id']);

	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onSelectTypeId;
