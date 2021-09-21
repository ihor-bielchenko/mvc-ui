import Store from 'components/Store';

const onChangeByLogic = (e, key) => {
	const prop = Store().getState().prop;

	if (prop.tempValue.placeholder[key]) {
		prop.tempValue.placeholder[key].value = '';
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
	}
};

export default onChangeByLogic;
