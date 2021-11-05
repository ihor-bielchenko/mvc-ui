import Store from 'components/Store';
import onClose from './onClose.js';

const onSubmit = (e, id) => {
	e.preventDefault();

	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.query
		&& jsObject.tempValue.query[id]) {
		if (!(id > 0)) {
			const newId = Date.now();

			jsObject.tempValue.query[newId] = {
				...jsObject.tempValue.query[id],
				id: newId,
			};
			Store().dispatch({
				type: 'jsObject',
				payload: () => ({ ...jsObject }),
			});
		}
		onClose(e);
	}
};

export default onSubmit;
