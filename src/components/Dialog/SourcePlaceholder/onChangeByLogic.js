import Store from 'components/Store';
import { 
	SOURCE_PLACEHOLDER,
	SOURCE_SCRIPT, 
} from 'structures/source.js';
import onCloseDialog from '../onClose.js';
import onClose from './onClose.js';

const onChangeByLogic = (e, typeId, id, name) => {
	const prop = Store().getState().prop;

	if (typeof prop.body[name] !== 'undefined') {
		prop.body[name] = { 
			source_id: SOURCE_PLACEHOLDER.id,
			value: {
				source_id: SOURCE_SCRIPT.id,
				type_id: typeId,
				id,
			},
		};
		onClose(e);
		onCloseDialog(SOURCE_SCRIPT.id)(e);
	}
};

export default onChangeByLogic;
