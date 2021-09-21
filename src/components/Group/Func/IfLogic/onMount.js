import Store from 'components/Store';

const onMount = (scriptId = 0) => {
	const func = Store().getState().func;

	func[scriptId].props = {
		1: '',
	};
	Store().dispatch({
		type: 'func',
		payload: () => func,
	});
};

export default onMount;
