import Store from 'components/Store';

const onSelect = (e, scriptId, propId) => {
	const func = Store().getState().func;

	if (func[scriptId] && func[scriptId].props) {
		func[scriptId].props[propId] = Number(e.target.value);
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
	}
};

export default onSelect;
