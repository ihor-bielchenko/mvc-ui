
export const setFunc = () => ({
	name: '',
	type_id: '',
	func_template_id: '',
	func_entity_id: '',
	func_format_id: '',
	props: {},
});
const func = (state = {}, action) => {
	return action.type === 'func'
		? action.payload()
		: state;
};

export default func;
