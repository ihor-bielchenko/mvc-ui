import Store from 'components/Store';
import { SOURCE_DB } from 'structures/source.js';

const onSave = (e, name, onClose) => {
	const prop = Store().getState().prop;

	if (typeof prop.body[name] !== 'undefined') {
		if (prop.tempValue.is_collection) {
			if (typeof prop.tempValue.offset === 'undefined') {
				prop.tempValue['offset'] = 0;
			}
			if (typeof prop.tempValue.limit === 'undefined') {
				prop.tempValue['limit'] = 10;
			}
		}

		prop.body[name] = { 
			source_id: SOURCE_DB.id,
			...prop.tempValue, 
		};
		prop.tempValue = {};
		onClose();
	}
};

export default onSave;
