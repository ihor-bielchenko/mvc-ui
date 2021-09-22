import Store from 'components/Store';

const onUnmount = () => {
	const prop = Store().getState().prop;

	prop.tempValue = {};
	Store().dispatch({
		type: 'prop',
		payload: () => ({ ...prop }),
	});
};

export default onUnmount;
