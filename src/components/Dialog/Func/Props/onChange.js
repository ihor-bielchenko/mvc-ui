import Store from 'components/Store';

const onChange = (e, entityId, index = 0) => {
	const jsObject = Store().getState().jsObject;
	const blocks = jsObject.blocks[0] || [];

	if (blocks[index]) {
		blocks[index].value = e.target.value;

		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onChange;
