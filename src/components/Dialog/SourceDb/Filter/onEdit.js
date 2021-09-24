import Store from 'components/Store';
import onClose from 'components/Menu/onClose.js';

let onEdit = (id) => (e) => {
	const jsObject = Store().getState().jsObject;

	jsObject.filterFormId = id;
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
	onClose(e, 'filter-'+ id);
};

export default onEdit;
