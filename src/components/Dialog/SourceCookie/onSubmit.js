import Store from 'components/Store';
import { 
	SOURCE_COOKIE,
	SOURCE_SCRIPT, 
} from 'structures/source.js';
import onClose from './onClose.js';

const onSubmit = (e, name) => {
	e.preventDefault();

	const prop = Store().getState().prop;
	const value = (typeof prop.tempValue.value === 'object' && 
		prop.tempValue.value.source_id === SOURCE_SCRIPT.id)
		? prop.tempValue.value
		: e.target.name.value;

	if (typeof prop.body[name] !== 'undefined') {
		prop.body[name] = { 
			source_id: SOURCE_COOKIE.id,
			value,
		};
		onClose();
	}
};

export default onSubmit;
