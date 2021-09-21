
export const setEntities = (data = []) => {
	const result = {};
	const switchTypes = {
		[process.env.ENTITY_PROP]: 'prop',
		[process.env.ENTITY_JSON]: 'json',
		[process.env.ENTITY_FUNC]: 'func',
		[process.env.ENTITY_CONDITION]: 'func',
	};

	data.forEach((item) => {
		return (result[item.id] = { 
			...item, 
			name: item[switchTypes[item.type_id]].name, 
		})
	});

	return {
		data: result,
	};
};
const initialState = () => ({});
const entities = (state = initialState(), action) => {
	return action.type === 'entities'
		? action.payload()
		: state;
};

export default entities;
