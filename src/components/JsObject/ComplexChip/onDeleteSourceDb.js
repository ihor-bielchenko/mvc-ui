import Store from 'components/Store';

const onDeleteSourceDb = (e, id) => {
	const jsObject = Store().getState().jsObject;

	if (typeof jsObject.data[id] === 'object') {
		const data = jsObject.data;
		const blocks = jsObject.blocks;
		const parentId = data[id].parent_id;

		([ ...blocks[parentId] ]).forEach((item, index) => {
			if (item.id === id) {
				blocks[parentId].splice(index, 1);
			}
		});
		([ ...blocks[id] || [] ]).forEach((item, index) => {
			delete data[item.id];
			delete blocks[item.id];
		});
		delete blocks[id];
		delete data[id];

		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}

	console.log('jsObject', id, jsObject);
};

export default onDeleteSourceDb;
