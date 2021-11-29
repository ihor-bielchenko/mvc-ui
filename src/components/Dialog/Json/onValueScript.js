import Store from 'components/Store';
import { initialState as jsObjectInitialState } from 'components/Store/jsObject.js';
import onLoader from 'components/Loader/onLoader';
import parseCortegeData from 'components/JsObject/parseCortegeData.js';
import getTemplate from 'components/JsObject/getTemplate.js';
import generateKey from 'components/JsObject/generateKey.js';
// import onDialog from 'components/Dialog/onDialog.js';
import onClose from 'components/Dialog/onClose.js';
import fetchCortegeGetMany from 'fetch/cortegeGetMany.js';
import axiosError from 'utils/axiosError.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { DIALOG_KEY_EXISTS } from 'consts/dialog.js';

const merge = (prepareData, currentItem, sourceValue, uniqueKey = false) => {
	const jsObject = Store().getState().jsObject;
	const data = jsObject.data;
	const blocks = jsObject.blocks;
	let newId = Date.now();

	data[newId] = getTemplate({
		parent_id: currentItem.id,
		id: newId,
		data_type_id: sourceValue.data_type_id,
		key: generateKey(blocks[currentItem.id] ?? []),
		value: sourceValue,
		disabledKey: true,
		disabledType: true,
		disabledValue: true,
		disabledRemove: true,
	});
	blocks[currentItem.id] = (blocks[currentItem.id] ?? [])
	blocks[currentItem.id].push(data[newId]);

	// Object
	// 	.keys(prepareData.data)
	// 	.forEach((key, i) => {
	// 		if (prepareData.data[key].id > 0) {
	// 			if (prepareData.data[key].parent_id === 0) {
	// 				prepareData.data[key].parent_id = data[newId].id;
	// 				if (prepareData.data[key].keyExistsFlag) {
	// 					prepareData.data[key].key = prepareData.data[key].key +'_'+ unique();
	// 					delete prepareData.data[key].keyExistsFlag;
	// 				}
	// 			}
	// 			data[prepareData.data[key].id] = { ...prepareData.data[key] };
	// 			data[prepareData.data[key].id].key = generateKey(blocks[data[prepareData.data[key].id].parent_id] ?? [], prepareData.data[key].key);
	// 			// data[prepareData.data[key].id].disabledKey = true;
	// 			data[prepareData.data[key].id].disabledType = true;
	// 			data[prepareData.data[key].id].disabledValue = true;
	// 			data[prepareData.data[key].id].disabledRemove = true;
	// 			blocks[data[prepareData.data[key].id].parent_id] = (blocks[data[prepareData.data[key].id].parent_id] ?? []);
	// 			blocks[data[prepareData.data[key].id].parent_id].push(data[prepareData.data[key].id]);
	// 		}
	// 	});
	onClose(DIALOG_KEY_EXISTS)();
};
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
			// const blocks = jsObject.blocks;
			const currentItem = jsObject.data[currentItemId] || {};
			const sourceValue = {
				source_type_id: SOURCE_TYPE_SCRIPT.id,
				script_id: scriptId,
				data_type_id: dataTypeId,
				id: entityId,
				workspaceId,
			};
			// let keyExistsFlag = false,
			// 	childId = Date.now() - 999999;

			// Object
			// 	.keys(prepareData.data)
			// 	.forEach((key, i) => {
			// 		if (prepareData.data[key].id > 0) {
			// 			const _id = prepareData.data[key].id + childId;
							
			// 			if (prepareData.data[key].parent_id === 0) {
			// 				blocks[currentItem.id].forEach((item) => {
			// 					if (item.key === prepareData.data[key].key) {
			// 						prepareData.data[key]['keyExistsFlag'] = true;
			// 						keyExistsFlag = true;
			// 					}
			// 				});
			// 			}
			// 			prepareData.data[key].id = _id;
			// 			prepareData.data[key].parent_id = prepareData.data[key].parent_id === 0
			// 				? prepareData.data[key].parent_id
			// 				: prepareData.data[key].parent_id + childId;
			// 		}
			// 	});
			// if (keyExistsFlag) {
			// 	onDialog(DIALOG_KEY_EXISTS, {
			// 		merge: () => merge(prepareData, currentItem, sourceValue, true),
			// 	})(e);
			// }
			// else {
				merge(prepareData, currentItem, sourceValue);
			// }
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
	}
	onLoader(false);
	onClose(SOURCE_TYPE_SCRIPT.id)(e);
};

export default onValueScript;

