import Store from 'components/Store';

const onSelectColumn = (e, scriptId, key) => {
	const value = Number(e.target.value);
	const func = Store().getState().func;

	if (func[scriptId] && func[scriptId].props[key] && value >= 1) {
		func[scriptId].props[key].column_id = value;
		func[scriptId].props[key].value = '';
		func[scriptId].props = { ...func[scriptId].props };
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
	}
};

export default onSelectColumn;
