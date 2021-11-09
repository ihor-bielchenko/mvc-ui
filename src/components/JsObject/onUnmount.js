import Store from 'components/Store';
import { DATA_TYPE_ATOMIC } from 'structures/dataTypes.js';

const onUnmount = () => {
	const jsObject = Store().getState().jsObject;

	jsObject.data = {
		1: {
			id: 1,
			parent_id: 0,
			data_type_id: DATA_TYPE_ATOMIC.id,
			key: '0',
			value: '',
		},
	};
	jsObject.blocks = {};
	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onUnmount;
