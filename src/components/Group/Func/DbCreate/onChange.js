import Store from 'components/Store';

const onChange = (e, scriptId, key) => {
	const func = Store().getState().func;

	if (func[scriptId] && func[scriptId].props) {
		func[scriptId].props[key].value = e.target.value;
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
	}
};

export default onChange;
