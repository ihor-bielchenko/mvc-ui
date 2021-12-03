import Store from 'components/Store';

const onSelect = (e, entityId) => {
	const jsObject = Store().getState().jsObject;
	const blocks = jsObject.blocks[0] || [];

	if (blocks[1]) {
		blocks[1].value = Number(e.target.value);
		blocks[2].value = '';
		blocks[3].value = '';
		blocks[4].value = '';
		blocks[5].value = undefined;
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onSelect;
