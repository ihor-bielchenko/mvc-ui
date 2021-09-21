import Store from 'components/Store';

let onCancel = () => {
	const prop = Store().getState().prop;

	delete prop.sortFormId;
	Store().dispatch({
		type: 'prop',
		payload: () => prop,
	});
};

export default onCancel;
