import Store from 'components/Store';
import onCancel from './onCancel.js';

const onSave = (e, id) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.filter
		&& jsObject.tempValue.filter[id]) {
		if (!(id > 0)) {
			const newId = Date.now();

			jsObject.tempValue.filter[newId] = {
				...jsObject.tempValue.filter[id],
				id: newId,
			};
			Store().dispatch({
				type: 'jsObject',
				payload: () => ({ ...jsObject }),
			});
		}
		onCancel();
	}
};

export default onSave;
