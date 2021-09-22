import Store from 'components/Store';
import { 
	SOURCE_REQUEST,
	SOURCE_SCRIPT, 
} from 'structures/source.js';
import onClose from './onClose.js';

const onSubmit = (e, id) => {
	e.preventDefault();

	const prop = Store().getState().prop;
	const value = (typeof prop.tempValue.value === 'object' && 
		prop.tempValue.value.source_id === SOURCE_SCRIPT.id)
		? prop.tempValue.value
		: e.target.value.value;

	if (typeof prop.body[id] !== 'undefined') {
		prop.body[id].value = { 
			source_id: SOURCE_REQUEST.id,
			value,
		};
		onClose();
	}
};

export default onSubmit;
