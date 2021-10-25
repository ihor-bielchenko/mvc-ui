import Store from 'components/Store';
import { 
	SOURCE_TYPE_PLACEHOLDER,
	SOURCE_TYPE_SCRIPT, 
} from 'structures/sourceTypes.js';
import onCloseDialog from '../onClose.js';
import onClose from './onClose.js';

const onChangeByLogic = (e, dataTypeId, valueId, itemId) => {
	const jsObject = Store().getState().jsObject;

	if (typeof jsObject.temp[itemId] === 'object') {
		jsObject.data[itemId] = { 
			source_type_id: SOURCE_TYPE_PLACEHOLDER.id,
			value: {
				source_type_id: SOURCE_TYPE_SCRIPT.id,
				data_type_id: dataTypeId,
				id: valueId,
			},
		};
	}
	onClose(e);
	onCloseDialog(SOURCE_TYPE_SCRIPT.id)(e);
};

export default onChangeByLogic;
