import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import getScriptId from 'components/Script/getScriptId.js';
import fetchArrowCreate from 'fetch/arrowCreate.js';
import axiosError from 'utils/axiosError.js';

const onClick = async (e, toId) => {
	const {
		arrows,
		entities,
	} = Store().getState();

	if (arrows.addingArrowFromId > 0 &&
		arrows.addingArrowToId === toId) {
		if (entities.data[arrows.addingArrowToId] &&
			entities.data[arrows.addingArrowToId].y < 50) {
			Store().dispatch({
				type: 'alert',
				payload: () => ({
					flag: true,
					message: 'Начало программы должно быть первым',
				}),
			});
		}
		else {
			let i = 0,
				iseetArrowFlag = false;

			while (i < arrows.data.length) {
				if (arrows.data[i].from_entity_id === arrows.addingArrowFromId &&
					arrows.data[i].to_entity_id === toId) {
					iseetArrowFlag = true;
				}
				i++;
			}

			if (!iseetArrowFlag) {
				onLoader(true);

				try {
					const response = await fetchArrowCreate({
						script_id: getScriptId(),
						from_entity_id: arrows.addingArrowFromId,
						to_entity_id: toId,
						data_type_id: process.env.ARROW_BASE,
					});
					const data = ((response || {}).data || {}).data || {};

					arrows.data.push(data);
					arrows.data = [ ...arrows.data ];
					arrows.addingArrowFromId = undefined;
					arrows.addingArrowToId = undefined;
					arrows.addingArrowMouseX = undefined;
					arrows.addingArrowMouseY = undefined;

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
		}
	}
};

export default onClick;
