import Store from 'components/Store';

const onChange = (e, flag, scriptId, propId) => {
	const func = Store().getState().func;

	if (func[scriptId] && func[scriptId].props) {
		func[scriptId].props[propId] = flag;
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
	}
};

export default onChange;
