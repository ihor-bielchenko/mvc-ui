import Store from 'components/Store';

const onCheckAll = (e) => {
	const target = e.currentTarget;
	const checked = target.checked;
	const dbRows = Store().getState().dbRows;

	dbRows.select = checked
		? dbRows
			.data
			.map((row) => row[1])
		: [];
	Store().dispatch({
		type: 'dbRows',
		payload: () => dbRows,
	});
};

export default onCheckAll;
