import Store from 'components/Store';
// import onLoader from 'components/Loader/onLoader';
import axiosError from 'utils/axiosError.js';
import fetchDbTableUpdate from 'fetch/dbTableUpdate.js';

const onStop = async (e, options, id) => {
	try {
		const db = Store().getState().db;
		const tables = db.tables;

		if (tables[id]) {
			if (tables[id].x !== options.x || tables[id].y !== options.y) {
				tables[id].x = options.x;
				tables[id].y = options.y;

				Store().dispatch({
					type: 'db',
					payload: () => ({ ...db }),
				});

				// onLoader(true);

				await fetchDbTableUpdate(id, {
					x: options.x,
					y: options.y,
				});
			}
			// onLoader(false);
		}
		else {
			throw new Error('undefined table');
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
		// onLoader(false);
	}
};

export default onStop;
