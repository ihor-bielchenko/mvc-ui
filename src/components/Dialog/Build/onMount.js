import Store from 'components/Store';
import { getLang } from 'components/Language';
import getServiceId from 'components/Service/getServiceId.js';
import getProjectId from 'components/Service/getProjectId.js';
import fetchBuildScriptCreate from 'fetch/buildScriptCreate.js';
import fetchBuildServiceCreate from 'fetch/buildServiceCreate.js';
import fetchBuildDbCreate from 'fetch/buildDbCreate.js';
import fetchBuildArchiveCreate from 'fetch/buildArchiveCreate.js';
import fetchRouteMany from 'fetch/routeMany.js';
import axiosError from 'utils/axiosError.js';
import { URL_API_ENGINE_DOWNLOAD } from 'consts/url.js';
import { DIALOG_BUILD } from 'consts/dialog.js';

const onMount = async (setProgress, dialog = DIALOG_BUILD, disabledDowndload = false) => {
	if (!Store().getState().dialogs[dialog]) {
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
					getLang('cmpDialogBuildOnMountStartConf'),
				],
			}));
		}, 0);
		await fetchBuildServiceCreate({
			service_id: fetchRouteData.data[i].service_id,
			project_id: getProjectId(),
		});
		while (i < fetchRouteData.data.length) {
			const _index = i;

			if (!Store().getState().dialogs[dialog]) {
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
						getLang('cmpDialogBuildOnMountStartBuild') + fetchRouteData.data[_index].name +'"',
					],
				}));
			}
			
			await fetchBuildScriptCreate({
				service_id: fetchRouteData.data[i].service_id,
				script_id: fetchRouteData.data[i].script_id,
				route_id: fetchRouteData.data[i].id
			});
			if (!Store().getState().dialogs[dialog]) {
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
						getLang('cmpDialogBuildOnMountContr') + fetchRouteData.data[_index].name +getLang('cmpDialogBuildOnMountContr2'),
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
				getLang('cmpDialogBuildOnMountDump'),
				getLang('cmpDialogBuildOnMountStartArh'),
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
				getLang('cmpDialogBuildOnMountEndConf'),
				getLang('cmpDialogBuildOnMountAllOk'),
			],
		}));
		if (!disabledDowndload) {
			const a = document.createElement('a');
			a.href = process.env.ENGINE_PATH + URL_API_ENGINE_DOWNLOAD +'?access_token='+ localStorage.getItem('access_token') +'&name='+ folderName;
			a.setAttribute('download', folderName +'.zip');
			a.click();
		}

		const services = Store().getState().services;

		if (services.form.server_status_id === process.env.SERVER_STATUS_INIT) {
			services.form.server_status_id = process.env.SERVER_STATUS_BUILDED;
		}
		Store().dispatch({
			type: 'services',
			payload: () => ({ ...services }),
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
		setProgress(() => ({
			value: -1,
			logs: [],
		}));
	}
};

export default onMount;
