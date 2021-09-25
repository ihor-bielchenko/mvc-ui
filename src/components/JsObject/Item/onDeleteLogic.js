import Store from 'components/Store';
import getDefaultValueByTypeId from '../getDefaultValueByTypeId.js';

const onDeleteLogic = (e, id) => {
	const jsObject = Store().getState().jsObject;

	if (typeof jsObject.data[id] === 'object') {
		jsObject.data[id].value = getDefaultValueByTypeId(jsObject.data[id].type_id);
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onDeleteLogic;
