import Store from 'components/Store';
import { SOURCE_PROXY_PASS } from 'structures/source.js';

const onSave = (e, name, onClose) => {
	e.preventDefault();

	const prop = Store().getState().prop;

	if (typeof prop.body[name] !== 'undefined') {
		prop.body[name] = { 
			source_id: SOURCE_PROXY_PASS.id,
			...prop.tempValue, 
		};
		prop.tempValue = {};
		onClose();
	}
};

export default onSave;
