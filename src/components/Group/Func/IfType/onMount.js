import Store from 'components/Store';
import { COLUMN_ID } from 'structures/columnTypes.js';

const onMount = (scriptId = 0) => {
	const func = Store().getState().func;

	func[scriptId].props = {
		1: COLUMN_ID.id,
		2: '',
	};
	Store().dispatch({
		type: 'func',
		payload: () => func,
	});
};

export default onMount;
