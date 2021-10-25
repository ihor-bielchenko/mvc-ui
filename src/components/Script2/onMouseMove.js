import Store from 'components/Store';

const onMouseMove = (e) => {
	const currentTarget = ((e.currentTarget || {}).childNodes || [])[0];
	const className = (currentTarget || {}).className;
	const offsetX = e.nativeEvent.offsetX;
	const offsetY = e.nativeEvent.offsetY;
	const arrows = Store().getState().arrows;

	if (arrows.addingArrowFromId > 0 &&
		typeof className === 'string' &&
		className.indexOf('scrollbar-container') > -1) {
		arrows.addingArrowMouseX = offsetX + currentTarget.scrollLeft;
		arrows.addingArrowMouseY = offsetY + currentTarget.scrollTop;
	
		Store().dispatch({
			type: 'arrows',
			payload: () => arrows,
		});
	}
};

export default onMouseMove;
