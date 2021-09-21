import Store from 'components/Store';

const onAddColumn = (e, scriptId) => {
	const func = Store().getState().func;

	if (func[scriptId]) {
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
			column_id: '',
			value: '',
		};
		func[scriptId].props = { ...func[scriptId].props };
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
	}
};

export default onAddColumn;
