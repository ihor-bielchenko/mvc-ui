import Store from 'components/Store';

const onCheckOne = (id) => (e) => {
	const target = e.currentTarget;
	const checked = target.checked;
	const dbRows = Store().getState().dbRows;
	const select = [ ...dbRows.select ];
	const findIndex = dbRows.select.indexOf(id);

	if (findIndex === -1 && checked) {
		select.push(id);
	}
	else if (findIndex > -1 && !checked) {
		select.splice(findIndex, 1);
	}

	dbRows.select = select;
	Store().dispatch({
		type: 'dbRows',
		payload: () => dbRows,
	});
};

export default onCheckOne;
