import Store from 'components/Store';
import { SOURCE_PROXY_PASS } from 'structures/source.js';

const onSave = (e, itemId, onClose) => {
	e.preventDefault();

	const jsObject = Store().getState().jsObject;

	if (typeof jsObject.temp[itemId] !== 'undefined') {
		jsObject.temp[itemId].value = { 
			source_id: SOURCE_PROXY_PASS.id,
			...jsObject.tempValue, 
		};
		jsObject.tempValue = {};
		onClose();
	}
};

export default onSave;
