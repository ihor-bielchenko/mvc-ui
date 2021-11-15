import Store from 'components/Store';
import { initialState as jsObjectInitialState } from 'components/Store/jsObject.js';
import onLoader from 'components/Loader/onLoader';
import parseCortegeData from 'components/JsObject/parseCortegeData.js';
import getTemplate from 'components/JsObject/getTemplate.js';
import generateKey from 'components/JsObject/generateKey.js';
import onClose from 'components/Dialog/onClose.js';
import fetchCortegeGetMany from 'fetch/cortegeGetMany.js';
import axiosError from 'utils/axiosError.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';

const onValueScript = (currentItemId) => async (e, scriptId, workspaceId, entityId, dataTypeId) => {
	onLoader(true);

	try {
		const {
			jsObject,
			script,
		} = Store().getState();

		if (jsObject.data[currentItemId]) {
			const fetchResponse = await fetchCortegeGetMany(script[workspaceId].data[entityId].sourceId);
			const fetchData = ((fetchResponse || {}).data || {}).data;
			const prepareData = parseCortegeData(jsObjectInitialState(), fetchData, scriptId, workspaceId);
			const data = jsObject.data;
			const blocks = jsObject.blocks;
			const currentItem = jsObject.data[currentItemId] || {};
			const sourceValue = {
				source_type_id: SOURCE_TYPE_SCRIPT.id,
				script_id: scriptId,
				data_type_id: dataTypeId,
				id: entityId,
				workspaceId,
			};
			const mergeKeys = Object.keys(prepareData.data);
			let newId = Date.now();

			data[newId] = getTemplate({
				parent_id: currentItem.id,
				id: newId,
				data_type_id: dataTypeId,
				key: generateKey(blocks[currentItem.id] ?? [], 'vvvvmvmvmmvmvv'),
				value: sourceValue,
				disabledKey: true,
				disabledType: true,
				disabledValue: true,
				disabledRemove: true,
			});
			blocks[currentItem.id] = (blocks[currentItem.id] ?? [])
			blocks[currentItem.id].push(data[newId]);

			console.log('currentItem.id', newId, blocks[currentItem.id], data);

			mergeKeys.forEach((key, i) => {
				if (prepareData.data[key].id > 0) {
					if (prepareData.data[key].parent_id === 0) {
						prepareData.data[key].parent_id = data[newId].id;
					}
					data[prepareData.data[key].id] = { ...prepareData.data[key] };
					console.log('prepareData.data[key].key', prepareData.data[key].key);
					data[prepareData.data[key].id].key = generateKey(blocks[data[prepareData.data[key].id].parent_id] ?? [], prepareData.data[key].key);
					data[prepareData.data[key].id].disabledKey = true;
					data[prepareData.data[key].id].disabledType = true;
					data[prepareData.data[key].id].disabledValue = true;
					data[prepareData.data[key].id].disabledRemove = true;
					blocks[data[prepareData.data[key].id].parent_id] = (blocks[data[prepareData.data[key].id].parent_id] ?? []);
					blocks[data[prepareData.data[key].id].parent_id].push(data[prepareData.data[key].id]);
				}
			});
			console.log('blocks', blocks, data);
		}
	}
	catch (err) {
		console.log('err', err);

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
	onClose(SOURCE_TYPE_SCRIPT.id)(e);
};

export default onValueScript;

