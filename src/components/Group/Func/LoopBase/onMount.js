import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import fetchScriptCreate from 'fetch/scriptCreate.js';
import axiosError from 'utils/axiosError.js';

const onMount = async (scriptId = 0, id = 0) => {
	const func = Store().getState().func;

	try {
		if (id > 0) {

		}
		else {
			const response = await fetchScriptCreate({
				'parent_script_id': scriptId,
				'parent_func_id': 0,
			});
			const data = ((response || {}).data || {}).data || {};

			func[scriptId].props = {
				1: '',
				2: data.id,
			};
		}
		Store().dispatch({
			type: 'func',
			payload: () => func,
		});
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
};

export default onMount;
