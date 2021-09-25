import Store from 'components/Store';

const onLimit = (e) => {
	const jsObject = Store().getState().jsObject;

	jsObject.tempValue['limit'] = e.target.value
		? Number(e.target.value)
		: undefined;
	Store().dispatch({
		type: 'jsObject',
		payload: () => jsObject,
	});
};

export default onLimit;
