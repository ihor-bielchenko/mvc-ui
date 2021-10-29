import Store from 'components/Store';

const onToggle = (scriptId, newFlag) => (e) => {
	if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
		return;
	}
	const script = Store().getState().script;

	script[scriptId].sidebarFlag = newFlag ?? !script[scriptId].sidebarFlag;
	Store().dispatch({
		type: 'script',
		payload: () => ({ ...script }),
	});
};

export default onToggle;
