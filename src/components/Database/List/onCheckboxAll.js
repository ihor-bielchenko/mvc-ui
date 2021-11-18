import Store from 'components/Store';

const onCheckboxAll = (e) => {
	const list = Store().getState().list;

	list.select = [];

	if (e.target.checked) {
		list.fetch.forEach((item) => {
			list.select.push(item.id);
		});
	}
	Store().dispatch({
		type: 'list',
		payload: () => ({ ...list }),
	});
};

export default onCheckboxAll;
