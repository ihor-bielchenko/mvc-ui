import onClose from 'components/Dialog/onClose.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';

const onChangeByLogic = (e, dataTypeId, id, setLogicValue) => {
	setLogicValue(() => ({
		source_type_id: SOURCE_TYPE_SCRIPT.id,
		data_type_id: dataTypeId,
		id,
	}));
	onClose(SOURCE_TYPE_SCRIPT.id)(e);
};

export default onChangeByLogic;
