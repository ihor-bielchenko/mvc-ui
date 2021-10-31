import Store from 'components/Store';
import { initialState } from 'components/Store/jsObject.js';

const onUnmount = () => {
	Store().dispatch({
		type: 'jsObject',
		payload: () => initialState(),
	});
};

export default onUnmount;
