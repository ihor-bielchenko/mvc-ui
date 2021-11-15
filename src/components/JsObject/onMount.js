import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import fetchCortegeGetMany from 'fetch/cortegeGetMany.js';
import axiosError from 'utils/axiosError.js';
import { 
	DATA_TYPE_ATOMIC,
	DATA_TYPE_TEXT, 
} from 'structures/dataTypes.js';
import getTemplate from './getTemplate.js';
import buildBlocks from './buildBlocks.js';
import parseCortegeData from './parseCortegeData.js';

const onMount = async (sourceId, dataTypeId, scriptId, workspaceId) => {
	let jsObject = Store().getState().jsObject;

	if (sourceId > 0) {
		onLoader(true);
		jsObject.data = {};

		try {
			const fetchResponse = await fetchCortegeGetMany(sourceId);
			const fetchData = ((fetchResponse || {}).data || {}).data;

			jsObject = parseCortegeData(jsObject, fetchData, scriptId, workspaceId);
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
	}
	else {
		jsObject.data[0] = jsObject.data[0] ?? getTemplate({
			parent_id: undefined,
			key: 0,
			value: undefined,
			data_type_id: dataTypeId,
			...typeof jsObject.data[0] === 'object'
				? jsObject.data[0]
				: {},
		});
		jsObject.data[1] = jsObject.data[1] ?? ({
			id: 1,
			parent_id: 0,
			data_type_id: DATA_TYPE_TEXT.id,
			key: '0',
			value: '',
		});
		jsObject.data[1].data_type_id = jsObject.data[1].data_type_id === DATA_TYPE_ATOMIC.id
			? DATA_TYPE_TEXT.id
			: jsObject.data[1].data_type_id;
	}
	jsObject.blocks = {};

	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...buildBlocks(jsObject) }),
	});
};

export default onMount;
