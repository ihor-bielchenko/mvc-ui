
export const initialState = (workspaceId, id) => (workspaceId > 0 && id > 0)
	? ({
		[workspaceId]: {
			id,
			sidebarFlag: false,
			data: {},
			arrows: [],
		},
	})
	: ({
		1: {
			id: 1,
			sidebarFlag: false,
			data: {},
			arrows: [],
		},
	});
const script = (state = initialState(), action) => {
	return action.type === 'script'
		? action.payload()
		: state;
};

export default script;
