import Store from 'components/Store';

const onOffset = (e) => {
	const jsObject = Store().getState().jsObject;

	jsObject.tempValue['offset'] = e.target.value
		? Number(e.target.value)
		: undefined;
	Store().dispatch({
		type: 'jsObject',
		payload: () => jsObject,
	});
};

export default onOffset;
