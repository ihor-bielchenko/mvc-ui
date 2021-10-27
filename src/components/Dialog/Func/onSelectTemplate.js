import Store from 'components/Store';

const onSelectTemplate = (e) => {
	const func = Store().getState().func;

	func.template_id = Number(e.target.value);
	Store().dispatch({
		type: 'func',
		payload: () => ({ ...func }),
	});
};

export default onSelectTemplate;
