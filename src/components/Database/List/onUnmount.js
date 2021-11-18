import Store from 'components/Store';
import { initialState as initialStateList } from 'components/Store/list.js';

const onUnmount = () => {
	Store().dispatch({
		type: 'list',
		payload: () => initialStateList(),
	});
};

export default onUnmount;
