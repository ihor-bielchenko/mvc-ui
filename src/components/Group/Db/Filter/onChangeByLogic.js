import onClose from 'components/Dialog/onClose.js';
import { SOURCE_SCRIPT } from 'structures/source.js';

const onChangeByLogic = (e, typeId, id, setLogicValue) => {
	setLogicValue(() => ({
		source_id: SOURCE_SCRIPT.id,
		type_id: typeId,
		id,
	}));
	onClose(SOURCE_SCRIPT.id)(e);
};

export default onChangeByLogic;
