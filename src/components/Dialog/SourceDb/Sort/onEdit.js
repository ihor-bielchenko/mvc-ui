import Store from 'components/Store';
import onClose from 'components/Menu/onClose.js';

let onEdit = (id) => (e) => {
	const jsObject = Store().getState().jsObject;

	jsObject.sortFormId = id;
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
	onClose();
};

export default onEdit;
