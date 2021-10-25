import Store from 'components/Store';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import onClose from './onClose.js';

const onChangeByLogic = (e, dataTypeId, id) => {
	const prop = Store().getState().prop;

	prop.tempValue.value = {
		source_type_id: SOURCE_TYPE_SCRIPT.id,
		data_type_id: dataTypeId,
		id,
	};
	onClose(SOURCE_TYPE_SCRIPT.id)(e);
};

export default onChangeByLogic;
