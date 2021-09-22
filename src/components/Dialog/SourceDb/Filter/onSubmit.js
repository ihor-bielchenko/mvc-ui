import Store from 'components/Store';

const onSubmit = (e, logicValue) => {
	e.preventDefault();

	const prop = Store().getState().prop;
	const id = Number(e.target.elements.id.value);
	const columnId = Number(e.target.elements.column_id.value);
	const operatorId = Number(e.target.elements.operator_id.value);
	const value = logicValue || e.target.elements.value.value;

	if (!prop.tempValue.filter) {
		prop.tempValue.filter = {};
	}
	if (id > 0 && prop.tempValue.filter[id]) {
		prop.tempValue.filter[id]['column_id'] = columnId;
		prop.tempValue.filter[id]['operator_id'] = operatorId;
		prop.tempValue.filter[id]['value'] = value;
		delete prop.filterFormId;
		Store().dispatch({
			type: 'prop',
			payload: () => ({ ...prop }),
		});
	}
	else if (id === 0) {
		const _id = Date.now();

		prop.tempValue.filter[_id] = {
			id: _id,
			column_id: columnId,
			operator_id: operatorId,
			value,
		};
		delete prop.filterFormId;
		Store().dispatch({
			type: 'prop',
			payload: () => ({ ...prop }),
		});
	}
};

export default onSubmit;
