import Store from 'components/Store';

let onAdd = (e) => {
	const jsObject = Store().getState().jsObject;

	jsObject.sortFormId = 0;
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onAdd;
