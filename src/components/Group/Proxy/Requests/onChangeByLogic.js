import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';

const onChangeByLogic = (e, dataTypeId, id, name, key) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.request[name]) {
		jsObject.tempValue.request[name][key] = {
			source_type_id: SOURCE_TYPE_SCRIPT.id,
			data_type_id: dataTypeId,
			id,
		};
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
		onClose(SOURCE_TYPE_SCRIPT.id)(e);
	}
};

export default onChangeByLogic;
