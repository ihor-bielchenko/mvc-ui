import Store from 'components/Store';

const onComplexDelete = (e, name) => {
	const prop = Store().getState().prop;

	if (prop.body[name]) {
		prop.body[name] = '';
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
		});
	}
};

export default onComplexDelete;
