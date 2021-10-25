import Store from 'components/Store';
import { setEntities } from 'components/Store/entities.js';
import { setArrows } from 'components/Store/arrows.js';
import { setFunc } from 'components/Store/func.js';
import onLoader from 'components/Loader/onLoader';
import fetchScriptOne from 'fetch/scriptOne.js';
import fetchArrowAll from 'fetch/arrowAll.js';
import axiosError from 'utils/axiosError.js';

const onMount = async (scriptId) => {
	onLoader(true);

	if (scriptId > 0) {
		try {
			const responseArrows = await fetchArrowAll(scriptId);
			const responseEntities = await fetchScriptOne(scriptId);
			const dataArrows = ((responseArrows || {}).data || {}).data || [];
			const dataEntities = ((responseEntities || {}).data || {}).data || {};
			
			Store().dispatch({
				type: 'entities',
				payload: () => setEntities(dataEntities.entities),
			});
			Store().dispatch({
				type: 'func',
				payload: () => setFunc(),
			});
			Store().dispatch({
				type: 'arrows',
				payload: () => ({
					...setArrows(),
					data: dataArrows,
				}),
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

export default onMount;
