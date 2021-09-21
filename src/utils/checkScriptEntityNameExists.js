import Store from 'components/Store';

const checkScriptEntityNameExists = (name) => {
	const entities = Store().getState().entities;
	const entityKeys = Object.keys(entities.data || {});
	const findExistName = entityKeys.filter((id) => entities.data[id].name === name);

	if (findExistName.length > 0) {
		Store().dispatch({
			type: 'alert',
			payload: () => ({
				flag: true,
				message: 'Элемент с таким названием уже существует',
			}),
		});
		return true;
	}
	return false;
};

export default checkScriptEntityNameExists;
