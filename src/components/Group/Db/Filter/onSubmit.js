import Store from 'components/Store';

const onSubmit = (e, logicValue) => {
	e.preventDefault();

	const jsObject = Store().getState().jsObject;
	const id = Number(e.target.elements.id.value);
	const columnId = Number(e.target.elements.column_id.value);
	const operatorId = Number(e.target.elements.operator_id.value);
	const value = logicValue || e.target.elements.value.value;

	if (!jsObject.tempValue.filter) {
		jsObject.tempValue.filter = {};
	}
	if (id > 0 && jsObject.tempValue.filter[id]) {
		jsObject.tempValue.filter[id]['column_id'] = columnId;
		jsObject.tempValue.filter[id]['operator_id'] = operatorId;
		jsObject.tempValue.filter[id]['value'] = value;
		delete jsObject.filterFormId;
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
	else if (id === 0) {
		const _id = Date.now();

		jsObject.tempValue.filter[_id] = {
			id: _id,
			column_id: columnId,
			operator_id: operatorId,
			value,
		};
		delete jsObject.filterFormId;
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onSubmit;
