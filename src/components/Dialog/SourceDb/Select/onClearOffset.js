import Store from 'components/Store';

const onClearOffset = (e) => {
	const jsObject = Store().getState().jsObject;

	jsObject.tempValue['offset'] = '';
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onClearOffset;
