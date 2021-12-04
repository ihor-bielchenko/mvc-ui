import Store from 'components/Store';

const onSelect = (e, entityId) => {
	const {
		jsObject,
		db,
	} = Store().getState();
	const blocks = jsObject.blocks[0] || [];

	if (blocks[1]) {
		blocks[1].value = Number(e.target.value);
		blocks[2].value = (db.columns[blocks[1].value] || {}).data_type_id || '';
		blocks[3].value = (db.columns[blocks[1].value] || {}).name || '';
		blocks[4].value = (db.columns[blocks[1].value] || {}).description || '';
		blocks[5].value = (db.columns[blocks[1].value] || {}).required ?? undefined;
		
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onSelect;
