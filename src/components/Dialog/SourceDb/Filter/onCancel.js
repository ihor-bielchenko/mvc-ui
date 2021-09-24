import Store from 'components/Store';

let onCancel = () => {
	const jsObject = Store().getState().jsObject;

	delete jsObject.filterFormId;
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onCancel;
