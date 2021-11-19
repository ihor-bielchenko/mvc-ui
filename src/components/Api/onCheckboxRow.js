import Store from 'components/Store';

const onCheckboxRow = (routeId) => (e) => {
	const list = Store().getState().list;
	const findIndex = list.select.indexOf(routeId);

	(findIndex > -1) 
		? list.select.splice(findIndex, 1)
		: list.select.push(routeId);
	Store().dispatch({
		type: 'list',
		payload: () => ({ ...list }),
	});
};

export default onCheckboxRow;
