import Store from 'components/Store';

const onMouseOut = (e) => {
	const arrows = Store().getState().arrows;

	if (arrows.addingArrowFromId > 0) {
		arrows['addingArrowToId'] = undefined;

		Store().dispatch({
			type: 'arrows',
			payload: () => arrows,
		});
	}
};

export default onMouseOut;
