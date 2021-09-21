import Store from 'components/Store';

const onSelect = (e, scriptId) => {
	const value = Number(e.target.value);
	const func = Store().getState().func;

	if (func[scriptId]) {
		func[scriptId].props['math_log_id'] = value;
		func[scriptId].props = { ...func[scriptId].props };
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
	}
};

export default onSelect;
