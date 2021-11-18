import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import axiosError from 'utils/axiosError.js';
import fetchDbTableMany from 'fetch/dbTableMany.js';

const onMount = async () => {
	onLoader(true);

	try {
		const url = window
			.location
			.pathname
			.split('/');
		const serviceId = Number(url[3]);

		if (serviceId > 0) {
			const db = Store().getState().db;
			const fetchDbTableResponse = await fetchDbTableMany(serviceId);
			const fetchDbTableData = ((fetchDbTableResponse || {}).data || {}).data || [];
			const collector = {};

			fetchDbTableData.forEach((item) => {
				collector[item.id] = { ...item };
			});
			db.tables = { ...collector };
			Store().dispatch({
				type: 'db',
				payload: () => ({ ...db }),
			});
		}
		else {
			throw new Error('undefined serviceId');
		}
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
