import Store from 'components/Store';
import { initialState as initialStateRoutes } from 'components/Store/routes.js';

const onUnmount = async () => {
	Store().dispatch({
		type: 'routes',
		payload: () => initialStateRoutes(),
	});
};

export default onUnmount;
