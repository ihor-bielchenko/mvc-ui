import {
	SOURCE_TYPE_MANUALLY,
	SOURCE_TYPE_DB,
	SOURCE_TYPE_PROXY_PASS,
	SOURCE_TYPE_HEADER,
	SOURCE_TYPE_REQUEST,
	SOURCE_TYPE_COOKIE,
	SOURCE_TYPE_SCRIPT,
} from 'structures/sourceTypes.js';
import { DATA_TYPE_NUMBER } from 'structures/dataTypes.js';

const parseDb = (item, jsObject, scriptId, workspaceId) => {
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
			: {
				source_type_id: SOURCE_TYPE_SCRIPT.id,
				data_type_id: DATA_TYPE_NUMBER.id,
				id: Number(sourceLimit.dependency.value),
				script_id: scriptId,
				workspaceId,
			},
		offset: sourceOffset.source_type_id === SOURCE_TYPE_MANUALLY.id
			? Number(sourceOffset.value)
			: {
				source_type_id: SOURCE_TYPE_SCRIPT.id,
				data_type_id: DATA_TYPE_NUMBER.id,
				id: Number(sourceOffset.dependency.value),
				script_id: scriptId,
				workspaceId,
			},
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
				: {
					source_type_id: SOURCE_TYPE_SCRIPT.id,
					data_type_id: _item.value.dependency.data_type_id,
					id: Number(_item.value.dependency.value),
					script_id: scriptId,
					workspaceId,
				},
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
				: {
					source_type_id: SOURCE_TYPE_SCRIPT.id,
					data_type_id: _item.value.dependency.data_type_id,
					id: Number(_item.value.dependency.value),
					script_id: scriptId,
					workspaceId,
				},
		};
	});

	if (isCollection) {
		jsObject.data[item.parent_id].collection = item.value;
	}
	return item;
};
const parseProxyPass = (item, scriptId, workspaceId) => {
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
				: {
					source_type_id: SOURCE_TYPE_SCRIPT.id,
					data_type_id: _item.value.dependency.data_type_id,
					id: Number(_item.value.dependency.value),
					script_id: scriptId,
					workspaceId,
				},
		};
	});
	sourceHeader.forEach((_item) => {
		item.value.header[_item.id] = {
			..._item,
			key: _item.key.source_type_id === SOURCE_TYPE_MANUALLY.id
				? _item.key.value
				: {
					source_type_id: SOURCE_TYPE_SCRIPT.id,
					data_type_id: _item.key.dependency.data_type_id,
					id: Number(_item.key.dependency.value),
					script_id: scriptId,
					workspaceId,
				},
			value: _item.value.source_type_id === SOURCE_TYPE_MANUALLY.id
				? _item.value.value
				: {
					source_type_id: SOURCE_TYPE_SCRIPT.id,
					data_type_id: _item.value.dependency.data_type_id,
					id: Number(_item.value.dependency.value),
					script_id: scriptId,
					workspaceId,
				},
		};
	});
	sourceRequest.forEach((_item) => {
		item.value.request[_item.id] = {
			..._item,
			key: _item.key.source_type_id === SOURCE_TYPE_MANUALLY.id
				? _item.key.value
				: {
					source_type_id: SOURCE_TYPE_SCRIPT.id,
					data_type_id: _item.key.dependency.data_type_id,
					id: Number(_item.key.dependency.value),
					script_id: scriptId,
					workspaceId,
				},
			value: _item.value.source_type_id === SOURCE_TYPE_MANUALLY.id
				? _item.value.value
				: {
					source_type_id: SOURCE_TYPE_SCRIPT.id,
					data_type_id: _item.value.dependency.data_type_id,
					id: Number(_item.value.dependency.value),
					script_id: scriptId,
					workspaceId,
				},
		};
	});
	return item;
};

const parseCortegeData = (jsObject, data, scriptId, workspaceId) => {
	let parentId = 0;

	data.forEach((item, i) => {
		const sourceTypeId = ({ ...item }).value.source_type_id;

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

		if (({ ...item }).value.dependency_id > 0
			&& typeof ({ ...item }).value.dependency === 'object') {
			item.value = {
				source_type_id: ({ ...item }).value.source_type_id,
				value: {
					source_type_id: SOURCE_TYPE_SCRIPT.id,
					data_type_id: ({ ...item }).value.dependency.data_type_id,
					id: Number(({ ...item }).value.dependency.value),
					script_id: scriptId,
					workspaceId,
				}
			};
		}
		switch (sourceTypeId) {
			case SOURCE_TYPE_DB.id:
				item = parseDb(item, jsObject, scriptId, workspaceId);
				break;
			case SOURCE_TYPE_PROXY_PASS.id:
				item = parseProxyPass(item, scriptId, workspaceId);
				break;
			case SOURCE_TYPE_HEADER.id:
			case SOURCE_TYPE_REQUEST.id:
			case SOURCE_TYPE_COOKIE.id:
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
	return jsObject;
};

export default parseCortegeData;
