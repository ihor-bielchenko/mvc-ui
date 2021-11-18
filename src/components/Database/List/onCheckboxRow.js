import Store from 'components/Store';

const onCheckboxRow = (e, rowId) => {
	const list = Store().getState().list;
	const findIndex = list.select.indexOf(rowId);

	(findIndex > -1) 
		? list.select.splice(findIndex, 1)
		: list.select.push(rowId);
	Store().dispatch({
		type: 'list',
		payload: () => ({ ...list }),
	});
};

export default onCheckboxRow;
