import Store from 'components/Store';

const onSelect = (e, index = 0) => {
	const jsObject = Store().getState().jsObject;
	const blocks = jsObject.blocks[0] || [];

	if (blocks[index]) {
		blocks[index].value = Number(e.target.value);
		blocks[1].value = '';
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onSelect;
