import Store from 'components/Store';

const onChange = (e, id) => {
	const value = e.target.value;
	const jsObject = Store().getState().jsObject;

	jsObject.data[id].value = value;
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onChange;
