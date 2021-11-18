import Store from 'components/Store';

const onSelect = (e, workspaceId, index = 0) => {
	const jsObject = Store().getState().jsObject;
	const blocks = jsObject.blocks[0] || [];

	if (blocks[index]) {
		blocks[index].value = Number(e.target.value);
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onSelect;
