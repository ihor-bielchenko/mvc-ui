import Store from 'components/Store';
import fetchCortegeCreateOne from 'fetch/cortegeCreateOne.js';
import fetchCortegeCreateMany from 'fetch/cortegeCreateMany.js';
import fetchCortegeDelete from 'fetch/cortegeDelete.js';
import axiosError from 'utils/axiosError.js';
import { SOURCE_TYPE_MANUALLY } from 'structures/sourceTypes.js';
import { DATA_TYPE_TEXT } from 'structures/dataTypes.js';

const prepareItem = (item = {}, toJsonFlag = false) => {
	item.key = {
		data_type_id: DATA_TYPE_TEXT.id,
		source_type_id: SOURCE_TYPE_MANUALLY.id,
			value: item.key ?? '',
	};
	item.value = {
		data_type_id: item.data_type_id,
		value: typeof item.value === 'object'
			? ({ ...({ ...item }).value })
			: (({ ...item }).value ?? ''),
		source_type_id: typeof item.value === 'object'
			? ({ ...({ ...item }).value }).source_type_id
			: SOURCE_TYPE_MANUALLY.id,
	};
	if (typeof item.value === 'object'
		&& typeof item.value.value === 'object') {
		delete item.value.value.source_type_id;
	}
	item.disabled_key = item.disabledKey;
	item.disabled_type = item.disabledType;
	item.disabled_value = item.disabledValue;
	item.disabled_remove = item.disabledRemove;
	
	delete item.data_type_id;
	delete item.source_type_id;
	delete item.collection;
	delete item.disabledKey;
	delete item.disabledType;
	delete item.disabledValue;
	delete item.disabledRemove;

	return toJsonFlag
		? JSON.stringify(item)
		: item;
};

const onSave = async (sourceId = 0) => {
	const { jsObject } = Store().getState();
	const blocks = JSON.parse(JSON.stringify(jsObject.blocks));
	const data = jsObject.data;
	const blockKeys = Object.keys(blocks);
	const ids = {};
	let i = 0;
	
	try {
		if (sourceId > 0) {
			await fetchCortegeDelete(JSON.stringify([ sourceId ]));
		}

		const fetchParentResponse = await fetchCortegeCreateOne({
			key: {
				data_type_id: DATA_TYPE_TEXT.id,
				source_type_id: SOURCE_TYPE_MANUALLY.id,
				value: String(data[0].key),
			},
			value: {
				data_type_id: data[0].data_type_id,
				source_type_id: SOURCE_TYPE_MANUALLY.id,
				value: '',
			},
			parent_id: 0,
			disabled_remove: Number(!!data[0].disabledRemove),
			disabled_type: Number(!!data[0].disabledType),
			disabled_key: Number(!!data[0].disabledKey),
			disabled_value: Number(!!data[0].disabledValue),
		});
		const fetchParentData = ((fetchParentResponse || {}).data || {}).data || {};

		ids[0] = fetchParentData.id;
		while (i < blockKeys.length) {
			const key = blockKeys[i];
			const fetchManyProps = blocks[key].map((item) => {
				item.parent_id = ids[key];
				return prepareItem(item, true);
			});
			const fetchManyResponse = await fetchCortegeCreateMany(fetchManyProps);
			const fetchManyData = ((fetchManyResponse || {}).data || {}).data || [];

			blocks[key].forEach((item, i) => (
				ids[item.id] = ids[item.id] ?? fetchManyData[i].id
			));
			i++;
		}

		return fetchParentData;
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
	return {};
};

export default onSave;
