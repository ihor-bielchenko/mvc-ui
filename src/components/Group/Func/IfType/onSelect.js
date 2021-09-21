import Store from 'components/Store';

const onSelect = (e, scriptId, propId) => {
	const func = Store().getState().func;

	if (func[scriptId] && func[scriptId].props) {
		func[scriptId].props[propId] = Number(e.target.value);
		delete func[scriptId].props['2'];
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
	}
};

export default onSelect;
