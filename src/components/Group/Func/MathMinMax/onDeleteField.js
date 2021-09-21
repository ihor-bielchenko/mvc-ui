import Store from 'components/Store';

const onDeleteField = (e, scriptId, key) => {
	const func = Store().getState().func;

	if (func[scriptId] && func[scriptId].props[key]) {
		delete func[scriptId].props[key];
		func[scriptId].props = { ...func[scriptId].props };
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
	}
};

export default onDeleteField;
