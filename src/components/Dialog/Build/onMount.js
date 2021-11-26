import Store from 'components/Store';
import getServiceId from 'components/Service/getServiceId.js';
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
			filter: JSON.stringify({ service_id: getServiceId() }),
		});
		const fetchRouteData = (fetchRouteResponse || {}).data || {};
		let i = 0;

		setTimeout(() => {
			setProgress((currentState) => ({
				...currentState,
				logs: [
					...currentState.logs,
					'Запуск процесса конфигурации данных',
					'Запуск процесса конфигурации роутинга',
				],
			}));
		}, 0);

		while (i < fetchRouteData.data.length) {
			await fetchBuildRouteCreate({
				service_id: fetchRouteData.data[i].service_id,
				route_id: fetchRouteData.data[i].id,
			});
			if (!Store().getState().dialogs[DIALOG_BUILD]) {
				return setProgress({
					value: 0,
					logs: [],
				});
			}
			
			await fetchBuildScriptCreate({
				service_id: fetchRouteData.data[i].service_id,
				script_id: fetchRouteData.data[i].script_id,
			});
			if (!Store().getState().dialogs[DIALOG_BUILD]) {
				return setProgress({
					value: 0,
					logs: [],
				});
			}
			i++;
		}
		setTimeout(() => {
			setProgress((currentState) => ({
				value: currentState.value + 10,
				logs: [
					...currentState.logs,
					'Успешое завершение конфигурации роутинга',
				],
			}));
		}, 0);
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
	setTimeout(() => {
		setProgress((currentState) => ({
			...currentState,
			value: -2,
		}));
	}, 1200);
};

export default setProgress;
