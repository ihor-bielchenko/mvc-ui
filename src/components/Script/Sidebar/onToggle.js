import Store from 'components/Store';

const onToggle = (newFlag) => (e) => {
	console.log('e.key', e.key);
	if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
		return;
	}

	const script = Store().getState().script;

	script.sidebarFlag = newFlag ?? !script.sidebarFlag;
	Store().dispatch({
		type: 'script',
		payload: () => ({ ...script }),
	});
};

export default onToggle;
