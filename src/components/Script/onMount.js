import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import fetchEntityMany from 'fetch/entityMany.js';
import fetchArrowMany from 'fetch/arrowMany.js';
import axiosError from 'utils/axiosError.js';

const onMount = async (id) => {
	const script = Store().getState().script;
	
	if (id > 0) {
		onLoader(true);
		
		try {
			const fetchArrowResponse = await fetchArrowMany(id);
			const fetchArrowData = ((fetchArrowResponse || {}).data || {}).data || [];

			const fetchEntitiesResponse = await fetchEntityMany(id);
			const fetchEntitiesData = ((fetchEntitiesResponse || {}).data || {}).data || [];

			script[id].arrows = fetchArrowData;
			script[id].data = {};
			fetchEntitiesData.forEach((entity) => {
				script[id].data[entity.id] = { ...entity };
			});

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
	script[id].loadedFlag = true;

	Store().dispatch({
		type: 'script',
		payload: () => ({ ...script }),
	});
};

export default onMount;
