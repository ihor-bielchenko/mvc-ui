import Store from 'components/Store';

const onMouseOver = (e, id) => {
	const arrows = Store().getState().arrows;

	if (arrows.addingArrowFromId > 0) {
		arrows['addingArrowToId'] = id;

		Store().dispatch({
			type: 'arrows',
			payload: () => arrows,
		});
	}
};

export default onMouseOver;
