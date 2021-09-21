import Store from 'components/Store';

const onSubmit = (e) => {
	e.preventDefault();

	const prop = Store().getState().prop;
	const id = Number(e.target.elements.id.value);
	const columnId = Number(e.target.elements.column_id.value);
	const direction = Number(e.target.elements.direction.value);

	if (!prop.tempValue.sort) {
		prop.tempValue.sort = {};
	}
	if (id > 0 && prop.tempValue.sort[id]) {
		prop.tempValue.sort[id]['column_id'] = columnId;
		prop.tempValue.sort[id]['direction'] = direction;
		delete prop.sortFormId;
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
	}
	else if (id === 0) {
		const _id = Date.now();

		prop.tempValue.sort[_id] = {
			id: _id,
			column_id: columnId,
			direction,
		};
		delete prop.sortFormId;
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
	}
};

export default onSubmit;
