import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import fetchEntityUpdate from 'fetch/entityUpdate.js';
import axiosError from 'utils/axiosError.js';

let _timeout;
const onDragStop = async (e, options, id) => {
	const entities = Store().getState().entities;
	let allowFetch = false;

	if (entities.data[id].dragFlag) {
		// если блок ставится в начало программы
		if (options.y <= 50) {
			const entityKeys = Object.keys(entities.data);
			let i = 0,
				issetStartEntity = false;

			// проверить что в начале программы уже есть блок
			while (i < entityKeys.length) {
				if (entities.data[entityKeys[i]].y <= 50 && 
					entities.data[entityKeys[i]].id !== id) {
					issetStartEntity = true;
					break;
				}
				i++;
			}

			if (!issetStartEntity) {
				entities.data[id].x = options.x;
				entities.data[id].y = options.y;
				allowFetch = true;
			}
		}
		else {
			entities.data[id].x = options.x;
			entities.data[id].y = options.y;
			allowFetch = true;
		}
		entities.data[id]['dragFlag'] = false;
		Store().dispatch({
			type: 'entities',
			payload: () => entities,
		});

		if (allowFetch) {
			onLoader(true);

			try {
				await fetchEntityUpdate(id, {
					x: entities.data[id].x,
					y: entities.data[id].y,
				});
				clearTimeout(_timeout);
				_timeout = setTimeout(() => {
					onLoader(false);
				}, 160);
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
};

export default onDragStop;
