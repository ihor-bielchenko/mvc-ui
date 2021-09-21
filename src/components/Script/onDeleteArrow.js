import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import fetchArrowDelete from 'fetch/arrowDelete.js';
import axiosError from 'utils/axiosError.js';

const onDeleteArrow = async (e, id) => {
	const arrows = Store().getState().arrows;
	const foundArrowIndex = arrows.data.findIndex((item) => item.id === id);

	if (foundArrowIndex > -1) {
		onLoader(true);

		try {
			await fetchArrowDelete(JSON.stringify([ id ]));

			arrows.data.splice(foundArrowIndex, 1);
			arrows.data = [ ...arrows.data ];
			Store().dispatch({
				type: 'arrows',
				payload: () => arrows,
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
};

export default onDeleteArrow;
