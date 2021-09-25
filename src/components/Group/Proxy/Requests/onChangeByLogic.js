import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { SOURCE_SCRIPT } from 'structures/source.js';

const onChangeByLogic = (e, typeId, id, name, key) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.request[name]) {
		jsObject.tempValue.request[name][key] = {
			source_id: SOURCE_SCRIPT.id,
			type_id: typeId,
			id,
		};
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
		onClose(SOURCE_SCRIPT.id)(e);
	}
};

export default onChangeByLogic;
