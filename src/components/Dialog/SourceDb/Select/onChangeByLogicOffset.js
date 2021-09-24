import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { SOURCE_SCRIPT } from 'structures/source.js';

const onChangeByLogicOffset = (e, typeId, id) => {
	const jsObject = Store().getState().jsObject;

	jsObject.tempValue['offset'] = {
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

export default onChangeByLogicOffset;
