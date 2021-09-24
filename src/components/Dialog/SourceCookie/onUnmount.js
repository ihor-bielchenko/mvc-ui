import Store from 'components/Store';

const onUnmount = () => {
	const jsObject = Store().getState().jsObject;

	jsObject.tempValue = {};
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onUnmount;
