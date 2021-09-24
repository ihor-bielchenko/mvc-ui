import Store from 'components/Store';
import getDefaultValueByTypeId from '../getDefaultValueByTypeId.js';

const onDeleteLogic = (e, id) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.temp[id]) {
		jsObject.temp[id].value = getDefaultValueByTypeId(jsObject.temp[id].type_id);
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onDeleteLogic;
