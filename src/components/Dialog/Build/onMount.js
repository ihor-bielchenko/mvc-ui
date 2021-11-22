import Store from 'components/Store';
import fetchBuildRouteCreate from 'fetch/buildRouteCreate.js';
import fetchBuildScriptCreate from 'fetch/buildScriptCreate.js';
import fetchRouteMany from 'fetch/routeMany.js';
import axiosError from 'utils/axiosError.js';
import { DIALOG_BUILD } from 'consts/dialog.js';

const setProgress = async (setProgress) => {
	if (!Store().getState().dialogs[DIALOG_BUILD]) {
		return setProgress({
			value: 0,
			logs: [],
		});
	}

	try {
		const fetchRouteResponse = await fetchRouteMany(1, {
			limit: 999,
		});
		const fetchRouteData = (fetchRouteResponse || {}).data || {};
		let i = 0;

		while (i < fetchRouteData.data.length) {
			await fetchBuildRouteCreate({
				service_id: fetchRouteData.data[i].service_id,
				route_id: fetchRouteData.data[i].id,
			});
			await fetchBuildScriptCreate({
				service_id: fetchRouteData.data[i].service_id,
				script_id: fetchRouteData.data[i].script_id,
			});
			console.log('fetchRouteData', fetchRouteData.data[i].id, fetchRouteData.data[i].script_id);

			i++;
		}
	
		setProgress(() => ({
			value: 2,
			logs: [],
		}));
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
		setProgress(() => ({
			value: -1,
			logs: [],
		}));
	}
};

export default setProgress;
