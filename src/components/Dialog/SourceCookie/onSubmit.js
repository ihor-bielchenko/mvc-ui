import Store from 'components/Store';
import onClose from 'components/Dialog/onClose.js';
import { 
	SOURCE_COOKIE,
	SOURCE_SCRIPT, 
} from 'structures/source.js';
import onUnmount from './onUnmount.js';

const onSubmit = (e, id, sourceId = SOURCE_COOKIE.id) => {
	e.preventDefault();

	const jsObject = Store().getState().jsObject;
	const value = (typeof jsObject.tempValue.value === 'object' 
		&& jsObject.tempValue.value.source_id === SOURCE_SCRIPT.id)
		? jsObject.tempValue.value
		: e.target.value.value;

	if (typeof jsObject.data[id] === 'object') {
		jsObject.data[id].value = {
			source_id: sourceId,
			value,
		};
	}
	onClose(sourceId)(e);
	onUnmount();
};

export default onSubmit;
