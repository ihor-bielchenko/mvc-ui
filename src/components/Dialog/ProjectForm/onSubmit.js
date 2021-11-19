import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader.js';
import fetchProjectCreate from 'fetch/projectCreate.js';
import fetchProjectUpdate from 'fetch/projectUpdate.js';
import axiosError from 'utils/axiosError.js';
import { DIALOG_PROJECT_FORM } from 'consts/dialog.js';
import onClose from '../onClose.js';

const onSubmit = async (e, projectId) => {
	e.preventDefault();

	const target = e.currentTarget;
	const name = target.elements['name'].value;
	const subdomainPath = target.elements['subdomain_path'].value;

	onLoader(true);

	try {
		const list = Store().getState().list;

		if (projectId > 0) {
			const fetchProjectResponse = await fetchProjectUpdate(projectId, {
				name,
				subdomain_path: subdomainPath,
			});
			const fetchProjectData = ((fetchProjectResponse || {}).data || {}).data || {};
			
			list.data[projectId] = {
				...fetchProjectData,
				services: { ...list.data[projectId].services },
			};
		}
		else {
			const fetchProjectResponse = await fetchProjectCreate({
				name,
				subdomain_path: subdomainPath,
			});
			const fetchProjectData = ((fetchProjectResponse || {}).data || {}).data || {};
		
			list.data[fetchProjectData.id] = {
				...fetchProjectData,
				services: {},
			};
		}
		Store().dispatch({
			type: 'list',
			payload: () => ({ ...list }),
		});
		onClose(DIALOG_PROJECT_FORM)();
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
	}
	onLoader(false);
};

export default onSubmit;
