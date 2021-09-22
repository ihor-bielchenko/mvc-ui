import Store from 'components/Store';
import { SOURCE_PLACEHOLDER } from 'structures/source.js';
import onClose from './onClose.js';

const onSave = (e, bodyId, id) => {
	const prop = Store().getState().prop;

	if (typeof prop.body[bodyId] !== 'undefined') {
		prop.body[bodyId].value = { 
			source_id: SOURCE_PLACEHOLDER.id,
			value: id,
		};
		onClose();
	}
};

export default onSave;
