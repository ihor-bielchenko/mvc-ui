import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { SOURCE_SCRIPT } from 'structures/source.js';

const onChangeByLogic = (e, typeId, id, name, key) => {
	const prop = Store().getState().prop;

	if (prop.tempValue.header[name]) {
		prop.tempValue.header[name][key] = {
			source_id: SOURCE_SCRIPT.id,
			type_id: typeId,
			id,
		};
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
		onClose(SOURCE_SCRIPT.id)(e);
	}
};

export default onChangeByLogic;
