
export const setArrows = () => ({
	addingArrowFromId: undefined,
	addingArrowToId: undefined,
	addingArrowMouseX: undefined,
	addingArrowMouseY: undefined,
	data: [/*{
		id: 1,
		from_entity_id: 1,
		to_entity_id: 2,
		type_id: 1,
	}*/],
})
const arrows = (state = setArrows(), action) => {
	return action.type === 'arrows'
		? action.payload()
		: state;
};

export default arrows;
