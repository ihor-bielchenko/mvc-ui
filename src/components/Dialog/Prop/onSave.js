import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import getScriptId from 'components/Script/getScriptId.js';
import onMount from 'components/Script/onMount.js';
import fetchPropUpdate from 'fetch/propUpdate.js';
import fetchPropCreate from 'fetch/propCreate.js';
import getPropValuesFormatId from 'utils/getPropValuesFormatId.js';
import axiosError from 'utils/axiosError.js';
import countScriptEmptyPosition from 'utils/countScriptEmptyPosition.js';
import checkScriptEntityNameExists from 'utils/checkScriptEntityNameExists.js';
import onClose from './onClose.js';

const onSave = async (e) => {
	onLoader(true);
	const {
		prop,
		entities,
	} = Store().getState();

	if (prop.id || (!prop.id && !checkScriptEntityNameExists(prop.name))) {
		try {
			const scriptId = getScriptId();
			const formatId = getPropValuesFormatId(prop.body);

			if (prop.id) {
				await fetchPropUpdate(prop.id, {
					script_id: scriptId,
					format_id: formatId,
					name: prop.name,
					body: JSON.stringify(prop.body),
				});

				entities.data[prop.id].type_id = process.env.ENTITY_PROP;
				entities.data[prop.id].format_id = formatId;
				entities.data[prop.id].name = prop.name;
				entities.data = { ...entities.data };
			}
			else {				
				await fetchPropCreate({
					script_id: scriptId,
					format_id: formatId,
					name: prop.name,
					body: JSON.stringify(prop.body),
					...countScriptEmptyPosition(),
				});
			}
			onClose(e);
			onMount(scriptId);
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
	else {
		onLoader(false);
	}
};

export default onSave;
