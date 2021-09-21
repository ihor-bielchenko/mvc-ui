import Store from 'components/Store';
import { SOURCE_SCRIPT } from 'structures/source.js';
import onClose from './onClose.js';

const onChangeByLogic = (e, typeId, id) => {
	const prop = Store().getState().prop;

	prop.tempValue.value = {
		source_id: SOURCE_SCRIPT.id,
		type_id: typeId,
		id,
	};
	onClose(SOURCE_SCRIPT.id)(e);
};

export default onChangeByLogic;
