import Store from 'components/Store';
import getServiceId from 'components/Service/getServiceId.js';
import getProjectId from 'components/Service/getProjectId.js';
import fetchBuildScriptCreate from 'fetch/buildScriptCreate.js';
import fetchBuildServiceCreate from 'fetch/buildServiceCreate.js';
import fetchBuildDbCreate from 'fetch/buildDbCreate.js';
import fetchBuildArchiveCreate from 'fetch/buildArchiveCreate.js';
import fetchRouteMany from 'fetch/routeMany.js';
import fetchBuildServiceRun from 'fetch/buildServiceRun.js';
import axiosError from 'utils/axiosError.js';
import { DIALOG_RUN } from 'consts/dialog.js';

const onMount = async (serverStatusId, setProgress) => {
	if (!Store().getState().dialogs[DIALOG_RUN]) {
		return setProgress({
			value: 0,
			logs: [],
		});
	}
	try {
		if (serverStatusId !== process.env.SERVER_STATUS_BUILDED) {
			const fetchRouteResponse = await fetchRouteMany(1, {
				limit: 999,
				filter: JSON.stringify({ service_id: getServiceId() }),
			});
			const fetchRouteData = (fetchRouteResponse || {}).data || {};
			const routesStep = 60 / fetchRouteData.data.length;
			let i = 0;

			setProgress((currentState) => ({
				...currentState,
				logs: [
					...currentState.logs,
					'Запуск процесса конфигурации',
				],
			}));
			await fetchBuildServiceCreate({
				service_id: fetchRouteData.data[i].service_id,
				project_id: getProjectId(),
			});
			while (i < fetchRouteData.data.length) {
				const _index = i;

				if (!Store().getState().dialogs[DIALOG_RUN]) {
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
				if (!Store().getState().dialogs[DIALOG_RUN]) {
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
			await fetchBuildArchiveCreate({
				service_id: getServiceId(),
			});
		}
		await fetchBuildServiceRun({
			service_id: getServiceId(),
			project_id: getProjectId(),
		});
		setProgress((currentState) => ({
			value: currentState.value + 10,
			logs: [
				...currentState.logs,
				'Конфигурация...',
			],
		}));
		setTimeout(() => {
			setProgress((currentState) => ({
				value: 90,
				logs: [
					...currentState.logs,
					'Добавление в облако...',
				],
			}));
			setTimeout(() => {
				setProgress((currentState) => ({
					...currentState,
					value: -2,
					logs: [
						...currentState.logs,
						'Завершение конфигурации',
						'Все файлы успешно собраны!',
						'Сервис запущен!',
					],
				}));

				const services = Store().getState().services;

				services.form.server_status_id = process.env.SERVER_STATUS_RUN;
				Store().dispatch({
					type: 'services',
					payload: () => ({ ...services }),
				});
			}, 1600);
		}, 1800);
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

export default onMount;
