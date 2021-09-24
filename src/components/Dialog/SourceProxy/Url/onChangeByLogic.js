import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { SOURCE_SCRIPT } from 'structures/source.js';

const onChangeByLogic = (e, typeId, id, routeId, key) => {
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
		source_id: SOURCE_SCRIPT.id,
		type_id: typeId,
		id,
	};
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
	onClose(SOURCE_SCRIPT.id)(e);
};

export default onChangeByLogic;
