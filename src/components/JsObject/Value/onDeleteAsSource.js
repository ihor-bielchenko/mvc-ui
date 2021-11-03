import Store from 'components/Store';
import getDefaultValueByTypeId from '../getDefaultValueByTypeId.js';

const onDeleteAsSource = (e, id) => {
	const jsObject = Store().getState().jsObject;

	if (typeof jsObject.data[id] === 'object') {
		jsObject.tempValue = {};
		jsObject.data[id].value = getDefaultValueByTypeId(jsObject.data[id].data_type_id);
		jsObject.data[id].source = undefined;
		jsObject.data[id].disabledType = false;
		jsObject.data[id].disabledValue = false;
		jsObject.data[id].disabledRemove = false;
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onDeleteAsSource;
