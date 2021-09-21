import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { SOURCE_SCRIPT } from 'structures/source.js';

const onChangeByLogic = (e, scriptId, typeId, id, propId, sourceScriptId) => {
	const {
		entities,
		func,
	} = Store().getState();

	if (entities[scriptId] && func[scriptId] && func[scriptId].props) {
		func[scriptId].props[propId] = {
			source_id: SOURCE_SCRIPT.id,
			script_id: sourceScriptId,
			type_id: typeId,
			id,
		};
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
		onClose(SOURCE_SCRIPT.id)(e);
	}
};

export default onChangeByLogic;
