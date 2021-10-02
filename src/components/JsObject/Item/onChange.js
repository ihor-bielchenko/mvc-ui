import Store from 'components/Store';

const onChange = (e, id, key = 'key') => {
	const jsObject = Store().getState().jsObject;
	
	if (typeof jsObject.data[id] === 'object') {
		jsObject.data[id][key] = e.target.value;

		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onChange;
