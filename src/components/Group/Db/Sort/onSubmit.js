import Store from 'components/Store';

const onSubmit = (e) => {
	e.preventDefault();

	const jsObject = Store().getState().jsObject;
	const id = Number(e.target.elements.id.value);
	const columnId = Number(e.target.elements.column_id.value);
	const direction = Number(e.target.elements.direction.value);

	if (!jsObject.tempValue.sort) {
		jsObject.tempValue.sort = {};
	}
	if (id > 0 && jsObject.tempValue.sort[id]) {
		jsObject.tempValue.sort[id]['column_id'] = columnId;
		jsObject.tempValue.sort[id]['direction'] = direction;
		delete jsObject.sortFormId;
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
	else if (id === 0) {
		const _id = Date.now();

		jsObject.tempValue.sort[_id] = {
			id: _id,
			column_id: columnId,
			direction,
		};
		delete jsObject.sortFormId;
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onSubmit;
