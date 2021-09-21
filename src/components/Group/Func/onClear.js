import Store from 'components/Store';

const onClear = (e, scriptId, propId) => {
	const func = Store().getState().func;

	if (func[scriptId] && func[scriptId].props[propId]) {
		func[scriptId].props[propId] = '';
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
	}
};

export default onClear;
