import Store from 'components/Store';
import { getLang } from 'components/Language';

const checkScriptEntityNameExists = (name) => {
	const entities = Store().getState().entities;
	const entityKeys = Object.keys(entities.data || {});
	const findExistName = entityKeys.filter((id) => entities.data[id].name === name);

	if (findExistName.length > 0) {
		Store().dispatch({
			type: 'alert',
			payload: () => ({
				flag: true,
				message: getLang('ElementAlreadyExists'),
			}),
		});
		return true;
	}
	return false;
};

export default checkScriptEntityNameExists;
