import Store from 'components/Store';
import getServiceId from 'components/Service/getServiceId.js';
import fetchBuildScriptCreate from 'fetch/buildScriptCreate.js';
import fetchBuildServiceCreate from 'fetch/buildServiceCreate.js';
import fetchBuildDbCreate from 'fetch/buildDbCreate.js';
import fetchBuildArchiveCreate from 'fetch/buildArchiveCreate.js';
import fetchRouteMany from 'fetch/routeMany.js';
import axiosError from 'utils/axiosError.js';
import { URL_API_ENGINE_DOWNLOAD } from 'consts/url.js';
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
		const routesStep = 80 / fetchRouteData.data.length;
		let i = 0;

		setTimeout(() => {
			setProgress((currentState) => ({
				...currentState,
				logs: [
					...currentState.logs,
					'Запуск процесса конфигурации',
				],
			}));
		}, 0);
		await fetchBuildServiceCreate({
			service_id: fetchRouteData.data[i].service_id,
		});
		while (i < fetchRouteData.data.length) {
			const _index = i;

			if (!Store().getState().dialogs[DIALOG_BUILD]) {
				return setProgress({
					value: 0,
					logs: [],
				});
			}
			else {
				setProgress((currentState) => ({
					...currentState,
					logs: [
						...currentState.logs,
						'Запуск сборки  "'+ fetchRouteData.data[_index].name +'"',
					],
				}));
			}
			
			await fetchBuildScriptCreate({
				service_id: fetchRouteData.data[i].service_id,
				script_id: fetchRouteData.data[i].script_id,
				route_id: fetchRouteData.data[i].id
			});
			if (!Store().getState().dialogs[DIALOG_BUILD]) {
				return setProgress({
					value: 0,
					logs: [],
				});
			}
			else {
				setProgress((currentState) => ({
					value: currentState.value + routesStep,
					logs: [
						...currentState.logs,
						'Контроллер "'+ fetchRouteData.data[_index].name +'" успешно собран',
					],
				}));
			}
			i++;
		}
		await fetchBuildDbCreate({
			service_id: getServiceId(),
		});
		setProgress((currentState) => ({
			value: currentState.value + 10,
			logs: [
				...currentState.logs,
				'Дамп базы данных',
				'Запуск архивации',
			],
		}));
		const fetchArchiveResponse = await fetchBuildArchiveCreate({
			service_id: getServiceId(),
		});
		const folderName = fetchArchiveResponse.data;

		setProgress((currentState) => ({
			...currentState,
			value: -2,
			logs: [
				...currentState.logs,
				'Завершение конфигурации',
				'Все файлы успешно собраны!',
			],
		}));
		const a = document.createElement('a');
		a.href = process.env.ENGINE_PATH + URL_API_ENGINE_DOWNLOAD +'?access_token='+ localStorage.getItem('access_token') +'&name='+ folderName;
		a.setAttribute('download', folderName +'.zip');
		a.click();
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
