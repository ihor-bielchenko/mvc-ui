import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { SOURCE_SCRIPT } from 'structures/source.js';

const onChangeByLogic = (e, typeId, id, routeId, key) => {
	const prop = Store().getState().prop;

	if (!prop.tempValue.placeholder) {
		prop.tempValue.placeholder = {
			[key]: {
				route_url_id: routeId,
				route_placeholder_id: key,
				value: '',
			},
		};
	}
	prop.tempValue.placeholder[key]['value'] = {
		source_id: SOURCE_SCRIPT.id,
		type_id: typeId,
		id,
	};
	Store().dispatch({
		type: 'prop',
		payload: () => prop,
	});
	onClose(SOURCE_SCRIPT.id)(e);
};

export default onChangeByLogic;
