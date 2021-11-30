import Store from 'components/Store';

const onChange = (index = 0) => (e) => {
	const jsObject = Store().getState().jsObject;
	const blocks = jsObject.blocks[0] || [];

	if (blocks[index]) {
		blocks[index].value = Number(e.target.checked);
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onChange;
