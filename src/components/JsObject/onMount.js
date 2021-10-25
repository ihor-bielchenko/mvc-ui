import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import fetchCortegeGetMany from 'fetch/cortegeGetMany.js';
import axiosError from 'utils/axiosError.js';
import { DATA_TYPE_TEXT } from 'structures/dataTypes.js';
import {
	SOURCE_TYPE_MANUALLY,
	SOURCE_TYPE_DB,
	SOURCE_TYPE_PROXY_PASS,
} from 'structures/sourceTypes.js';
import getTemplate from './getTemplate.js';
import buildBlocks from './buildBlocks.js';

const parseDb = (item) => {
	const jsObject = Store().getState().jsObject;
	const { 
		value: {
			source_type_id: sourceTypeId,
			dbs: {
				is_collection: isCollection,
				source_limit: sourceLimit,
				source_offset: sourceOffset,
				source_select: sourceSelect,
				source_filter: sourceFilter,
				source_sort: sourceSort,
				source_query: sourceQuery,
			}
		} 
	} = { ...item };

	item.value = {
		is_collection: isCollection,
		source_type_id: sourceTypeId,
		limit: sourceLimit.source_type_id === SOURCE_TYPE_MANUALLY.id
			? Number(sourceLimit.value)
			: 0,
		offset: sourceOffset.source_type_id === SOURCE_TYPE_MANUALLY.id
			? Number(sourceOffset.value)
			: 0,
		select: [],
		columns: {},
		filter: {},
		sort: {},
		query: {},
	};
	sourceSelect.forEach((_item) => {
		item.value.select.push(_item.column_id);
		item.value.columns[_item.column_id] = _item.column_text;
	});
	sourceFilter.forEach((_item) => {
		item.value.filter[_item.id] = {
			..._item,
			value: _item.value.source_type_id === SOURCE_TYPE_MANUALLY.id
				? _item.value.value
				: '',
		};
	});
	sourceSort.forEach((_item) => {
		item.value.sort[_item.id] = { ..._item };
	});
	sourceQuery.forEach((_item) => {
		item.value.query[_item.id] = {
			..._item,
			value: _item.value.source_type_id === SOURCE_TYPE_MANUALLY.id
				? _item.value.value
				: '',
		};
	});

	if (isCollection) {
		jsObject.data[item.parent_id].collection = item.value;
	}
	return item;
};
const parseProxyPass = (item) => {
	const { 
		value: {
			source_type_id: sourceTypeId,
			proxy: {
				route_id: routeId,
				service_id: serviceId,
				source_placeholder: sourcePlaceholder,
				source_header: sourceHeader,
				source_request: sourceRequest,
				status_code: statusCode,
				data,
				headers,
				method,
				uri,
			}
		} 
	} = { ...item };

	item.value = {
		source_type_id: sourceTypeId,
		route_id: routeId,
		service_id: serviceId,
		columns: {
			data,
			headers,
			method,
			statusCode,
			uri,
		},
		placeholder: {},
		header: {},
		request: {},
	};
	sourcePlaceholder.forEach((_item) => {
		item.value.placeholder[_item.route_placeholder_id] = {
			..._item,
			value: _item.value.source_type_id === SOURCE_TYPE_MANUALLY.id
				? _item.value.value
				: '',
		};
	});
	sourceHeader.forEach((_item) => {
		item.value.header[_item.id] = {
			..._item,
			key: _item.key.source_type_id === SOURCE_TYPE_MANUALLY.id
				? _item.key.value
				: '',
			value: _item.value.source_type_id === SOURCE_TYPE_MANUALLY.id
				? _item.value.value
				: '',
		};
	});
	sourceRequest.forEach((_item) => {
		item.value.request[_item.id] = {
			..._item,
			key: _item.key.source_type_id === SOURCE_TYPE_MANUALLY.id
				? _item.key.value
				: '',
			value: _item.value.source_type_id === SOURCE_TYPE_MANUALLY.id
				? _item.value.value
				: '',
		};
	});
	return item;
};

const onMount = async (sourceId, dataTypeId) => {
	const jsObject = Store().getState().jsObject;

	if (sourceId > 0) {
		onLoader(true);
		jsObject.data = {};

		try {
			const fetchResponse = await fetchCortegeGetMany(sourceId);
			const fetchData = ((fetchResponse || {}).data || {}).data;
			let parentId = 0;

			fetchData.forEach((item, i) => {
				if (item.parent_id === 0) {
					parentId = item.id;
					item.parent_id = undefined;
					item.id = 0;
				}
				if (item.parent_id === parentId) {
					item.parent_id = 0;
				}
				item.data_type_id = item.value.data_type_id;
				item.key = item.key.value;

				switch (({ ...item }).value.source_type_id) {
					case SOURCE_TYPE_DB.id:
						item = parseDb(item);
						break;
					case SOURCE_TYPE_PROXY_PASS.id:
						item = parseProxyPass(item);
						break;
					default:
						item.value = item.value.value;
						break;
				}
				item.disabledKey = item.disabled_key;
				item.disabledType = item.disabled_type;
				item.disabledValue = item.disabled_value;
				item.disabledRemove = item.disabled_remove;
				delete item.disabled_key;
				delete item.disabled_type;
				delete item.disabled_value;
				delete item.disabled_remove;

				jsObject.data[item.id] = { ...item };
			});
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
	}
	jsObject.blocks = {};

	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...buildBlocks(jsObject) }),
	});
};

export default onMount;
