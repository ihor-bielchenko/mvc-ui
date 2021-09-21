import Store from 'components/Store';
import onClose from 'components/Menu/onClose.js';

let onEdit = (id) => (e) => {
	const prop = Store().getState().prop;

	prop.sortFormId = id;
	Store().dispatch({
		type: 'prop',
		payload: () => prop,
	});
	onClose();
};

export default onEdit;
