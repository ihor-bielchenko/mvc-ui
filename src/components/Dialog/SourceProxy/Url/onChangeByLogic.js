import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';

const onChangeByLogic = (e, dataTypeId, id, routeId, key) => {
	const jsObject = Store().getState().prop;

	if (!jsObject.tempValue.placeholder) {
		jsObject.tempValue.placeholder = {
			[key]: {
				route_url_id: routeId,
				route_placeholder_id: key,
				value: '',
			},
		};
	}
	jsObject.tempValue.placeholder[key]['value'] = {
		source_type_id: SOURCE_TYPE_SCRIPT.id,
		data_type_id: dataTypeId,
		id,
	};
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
	onClose(SOURCE_TYPE_SCRIPT.id)(e);
};

export default onChangeByLogic;
