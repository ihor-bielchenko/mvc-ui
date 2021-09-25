import Store from 'components/Store';

const onClearLimit = (e) => {
	const jsObject = Store().getState().jsObject;

	jsObject.tempValue['limit'] = '';
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onClearLimit;
