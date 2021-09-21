import Store from 'components/Store';

const onSelectFuncTemplate = (e) => {
	const value = e.target.value;

	if (value > 0) {
		const func = Store().getState().func;
		const entityId = Number(e.currentTarget.dataset['entity_id']);
		const formatId = Number(e.currentTarget.dataset['format_id']);

		func.func_template_id = value;
		func.func_entity_id = entityId >= 0
			? entityId
			: '';
		func.func_format_id = formatId >= 0
			? formatId
			: '';
		func.props = {};
		
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
	}
};

export default onSelectFuncTemplate;
