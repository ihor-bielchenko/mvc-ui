import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { SOURCE_SCRIPT } from 'structures/source.js';

const onChangeByLogic = (e, scriptId, typeId, id, key) => {
	const func = Store().getState().func;

	if (func[scriptId] && 
		func[scriptId].props &&
		func[scriptId].props[key]) {
		func[scriptId].props[key].value = {
			source_id: SOURCE_SCRIPT.id,
			script_id: scriptId,
			type_id: typeId,
			id,
		};
		func[scriptId].props = { ...func[scriptId].props };
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
		onClose(SOURCE_SCRIPT.id)(e);
	}
};

export default onChangeByLogic;
