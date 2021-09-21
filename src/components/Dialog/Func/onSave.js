import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import fetchFuncUpdate from 'fetch/funcUpdate.js';
import fetchFuncCreate from 'fetch/funcCreate.js';
import countScriptEmptyPosition from 'utils/countScriptEmptyPosition.js';
import checkScriptEntityNameExists from 'utils/checkScriptEntityNameExists.js';
import axiosError from 'utils/axiosError.js';
import onClose from './onClose.js';

const onSave = async (e) => {
	onLoader(true);

	const func = Store().getState().func;

	if (func.id || (!func.id && !checkScriptEntityNameExists(func.name))) {
		try {
			if (!func.func_template_id) {
				throw new Error('Шаблон функции не выбран');
			}
			if (Object.keys(func.props).length <= 0) {
				throw new Error('Не указаны параметры функции');
			}
			if (func.id) {
				await fetchFuncUpdate(func.id, {
					// script_id: scriptId,
					format_id: func.func_format_id,
					name: func.name,
					func_template_id: func.func_template_id,
					props: JSON.stringify(func.props),
				});
			}
			else {
				await fetchFuncCreate({
					// script_id: scriptId,
					format_id: func.func_format_id,
					name: func.name,
					func_template_id: func.func_template_id,
					props: JSON.stringify(func.props),
					...countScriptEmptyPosition(),
				});
			}
			onClose(e);
			onLoader(false);
		}
		catch (err) {
			Store().dispatch({
				type: 'alert',
				payload: () => ({
					flag: true,
					message: axiosError(err),
					vertical: 'bottom',
					horizontal: 'right',
				}),
			});
			onLoader(false);
		}
	}
	else {
		onLoader(false);
	}
};

export default onSave;
