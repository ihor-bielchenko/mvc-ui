import Store from 'components/Store';

const onClick = (e) => {
	const arrows = Store().getState().arrows;

	if (arrows.addingArrowFromId > 0) {
		arrows['addingArrowFromId'] = undefined;
		arrows['addingArrowToId'] = undefined;
		arrows['addingArrowMouseX'] = undefined;
		arrows['addingArrowMouseY'] = undefined;

		Store().dispatch({
			type: 'arrows',
			payload: () => arrows,
		});
	}
};

export default onClick;
