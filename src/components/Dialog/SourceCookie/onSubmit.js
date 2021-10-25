import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { 
	SOURCE_TYPE_COOKIE,
	SOURCE_TYPE_SCRIPT, 
} from 'structures/sourceTypes.js';
import onUnmount from './onUnmount.js';

const onSubmit = (e, id, sourceTypeId = SOURCE_TYPE_COOKIE.id) => {
	e.preventDefault();

	const jsObject = Store().getState().jsObject;
	const value = (typeof jsObject.tempValue.value === 'object' 
		&& jsObject.tempValue.value.source_type_id === SOURCE_TYPE_SCRIPT.id)
		? jsObject.tempValue.value
		: e.target.value.value;

	if (typeof jsObject.data[id] === 'object') {
		jsObject.data[id].value = {
			source_type_id: sourceTypeId,
			value,
		};
	}
	onClose(sourceTypeId)(e);
	onUnmount();
};

export default onSubmit;
