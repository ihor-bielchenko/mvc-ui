import Store from 'components/Store';
import { SOURCE_PLACEHOLDER } from 'structures/source.js';
import onClose from './onClose.js';

const onSave = (e, name, id) => {
	const prop = Store().getState().prop;

	if (typeof prop.body[name] !== 'undefined') {
		prop.body[name] = { 
			source_id: SOURCE_PLACEHOLDER.id,
			value: id,
		};
		onClose();
	}
};

export default onSave;
