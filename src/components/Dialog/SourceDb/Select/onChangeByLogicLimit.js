import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { SOURCE_SCRIPT } from 'structures/source.js';

const onChangeByLogicLimit = (e, typeId, id) => {
	const prop = Store().getState().prop;

	prop.tempValue['limit'] = {
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

export default onChangeByLogicLimit;
