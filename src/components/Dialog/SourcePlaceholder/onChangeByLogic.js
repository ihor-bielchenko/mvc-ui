import Store from 'components/Store';
import { 
	SOURCE_PLACEHOLDER,
	SOURCE_SCRIPT, 
} from 'structures/source.js';
import onCloseDialog from '../onClose.js';
import onClose from './onClose.js';

const onChangeByLogic = (e, typeId, valueId, itemId) => {
	const jsObject = Store().getState().jsObject;

	if (typeof jsObject.temp[itemId] === 'object') {
		jsObject.data[itemId] = { 
			source_id: SOURCE_PLACEHOLDER.id,
			value: {
				source_id: SOURCE_SCRIPT.id,
				type_id: typeId,
				id: valueId,
			},
		};
	}
	onClose(e);
	onCloseDialog(SOURCE_SCRIPT.id)(e);
};

export default onChangeByLogic;
