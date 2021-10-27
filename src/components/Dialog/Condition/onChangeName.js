import Store from 'components/Store';

const onChangeName = (e) => {
	const value = e.target.value;
	const func = Store().getState().func;

	func.name = value;
	Store().dispatch({
		type: 'func',
		payload: () => ({ ...func }),
	});
};

export default onChangeName;
