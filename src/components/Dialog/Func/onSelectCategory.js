import Store from 'components/Store';

const onSelectCategory = (e) => {
	const func = Store().getState().func;

	func.category_id = Number(e.target.value);
	func.template_id = '';
	Store().dispatch({
		type: 'func',
		payload: () => ({ ...func }),
	});
};

export default onSelectCategory;
