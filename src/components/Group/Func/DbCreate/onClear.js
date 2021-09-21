import Store from 'components/Store';

const onClear = (e, scriptId, key) => {
	const func = Store().getState().func;

	if (func[scriptId] && 
		func[scriptId].props &&
		func[scriptId].props[key]) {
		func[scriptId].props[key].value = '';
		func[scriptId].props = { ...func[scriptId].props };
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
	}
};

export default onClear;
