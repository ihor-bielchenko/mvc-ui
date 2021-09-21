import Store from 'components/Store';

const onDragProcess = (e, options, id) => {
	const entities = Store().getState().entities;

	entities.data[id]['dragFlag'] = true;
	entities.data[id].x = options.x;
	entities.data[id].y = options.y;
	Store().dispatch({
		type: 'entities',
		payload: () => entities,
	});
};

export default onDragProcess;
