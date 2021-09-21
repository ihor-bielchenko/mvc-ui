import Store from 'components/Store';

const onAddField = (e, scriptId) => {
	const func = Store().getState().func;

	if (func[scriptId] && func[scriptId].props) {
		let _id = 0;

		Object
			.keys(func[scriptId].props)
			.forEach((key) => {
				const _key = Number(key);

				if (_key > _id) {
					_id = _key;
				}
			});
		func[scriptId].props[_id + 1] = {
			value: '',
		};
		func[scriptId].props = { ...func[scriptId].props };
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
	}
};

export default onAddField;
