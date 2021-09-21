import Store from 'components/Store';

const onArrow = (e, id) => {
	e.stopPropagation();

	const arrows = Store().getState().arrows;

	arrows.addingArrowFromId = id;
	Store().dispatch({
		type: 'arrows',
		payload: () => arrows,
	});
};

export default onArrow;
