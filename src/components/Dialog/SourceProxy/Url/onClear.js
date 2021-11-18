import Store from 'components/Store';

const onChangeByLogic = (e, key) => {
	const jsObject = Store().getState().jsObject;

	if (jsObject.tempValue.placeholder[key]) {
		jsObject.tempValue.placeholder[key].value = '';
		Store().dispatch({
			type: 'jsObject',
			payload: () => ({ ...jsObject }),
		});
	}
};

export default onChangeByLogic;
