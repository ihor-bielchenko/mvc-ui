import Store from 'components/Store';

const onSelectFuncType = (e) => {
	const value = e.target.value;

	if (value > 0) {
		const func = Store().getState().func;

		func.type_id = value;
		func.func_template_id = '';
		func.func_entity_id = '';
		func.func_format_id = '';
		func.props = {};
		
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
	}
};

export default onSelectFuncType;
