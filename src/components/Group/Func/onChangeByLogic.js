import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';

const onChangeByLogic = (e, scriptId, dataTypeId, id, propId, sourceScriptId) => {
	const {
		entities,
		func,
	} = Store().getState();

	if (entities[scriptId] && func[scriptId] && func[scriptId].props) {
		func[scriptId].props[propId] = {
			source_type_id: SOURCE_TYPE_SCRIPT.id,
			script_id: sourceScriptId,
			data_type_id: dataTypeId,
			id,
		};
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
		onClose(SOURCE_TYPE_SCRIPT.id)(e);
	}
};

export default onChangeByLogic;
