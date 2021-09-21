import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import fetchPropOne from 'fetch/propOne.js';
import axiosError from 'utils/axiosError.js';
import parseSourceValue from 'utils/parseSourceValue.js';
import { 
	SOURCE_DB, 
	SOURCE_PROXY_PASS,
	SOURCE_HEADER,
	SOURCE_REQUEST,
	SOURCE_COOKIE,
	SOURCE_PLACEHOLDER,
} from 'structures/source.js';

const _parseValueDb = (data, body) => {
	const { 
		is_collection,
		limit,
		limit_func_id,
		limit_prop_id,
		offset,
		offset_func_id,
		offset_prop_id,
		filter_operator_id,
		db_select,
		db_filter,
		db_sort,
		db_query,
	} = data.dbs;
	const filter = {};
	const sort = {};
	const query = {};

	db_filter.forEach(({
		id,
		column_id,
		operator_id,
		value,
		value_func_id,
		value_prop_id,
	}) => {
		filter[id] = {
			id,
			column_id,
			operator_id,
			value: parseSourceValue(value_func_id, value_prop_id, value), 
		};
	});
	db_sort.forEach(({
		id,
		column_id,
		direction,
	}) => {
		sort[id] = {
			id,
			column_id,
			direction,
		};
	});
	db_query.forEach(({
		id,
		left,
		right,
		value,
		value_func_id,
		value_prop_id,
	}) => {
		query[id] = {
			id,
			left,
			right,
			value: parseSourceValue(value_func_id, value_prop_id, value),
		};
	});

	body[data.id] = {
		id: data.id,
		source_id: data.source_id,
		is_collection,
		filter_operator_id,
		limit: parseSourceValue(limit_func_id, limit_prop_id, limit),
		offset: parseSourceValue(offset_func_id, offset_prop_id, offset),
		select: db_select.map((item) => item.column_id),
		filter,
		sort,
		query,
	};
	return body;
};
const _parseValueProxy = (data, body) => {
	const {
		placeholder,
		header,
		request,
	} = data.proxy;
	const headerStructure = {};
	const requestStructure = {};

	header.forEach(({
		id,
		key,
		key_func_id,
		key_prop_id,
		value,
		value_func_id,
		value_prop_id,
	}) => {
		headerStructure[id] = {
			id,
			key: parseSourceValue(key_func_id, key_prop_id, key),
			value: parseSourceValue(value_func_id, value_prop_id, value),
		};
	});
	request.forEach(({
		id,
		key,
		key_func_id,
		key_prop_id,
		value,
		value_func_id,
		value_prop_id,
	}) => {
		requestStructure[id] = {
			id,
			key: parseSourceValue(key_func_id, key_prop_id, key),
			value: parseSourceValue(value_func_id, value_prop_id, value),
		};
	});
	body[data.id] = {
		source_id: data.source_id,
		route_id: data.proxy.route_id,
		service_id: data.proxy.service_id,
		placeholder: {
			[placeholder.route_placeholder_id]: {
				route_placeholder_id: placeholder.route_placeholder_id,
				route_url_id: placeholder.route_url_id,
				value: parseSourceValue(placeholder.value_func_id, placeholder.value_prop_id, placeholder.value),
			},
		},
		header: headerStructure,
		request: requestStructure,
	};
	return body;
};
const _parseValueServer = (key = 'header') => (data, body) => {
	const {
		value,
		value_func_id,
		value_prop_id,
	} = data[key];

	body[data.id] = {
		source_id: data.source_id,
		value: parseSourceValue(value_func_id, value_prop_id, value),
	};
	return body;
};
const _parseValuePlaceholder = (data, body) => {
	const {
		id,
		value,
		value_func_id,
		value_prop_id,
	} = data.placeholder;

	body[data.id] = {
		id,
		source_id: data.source_id,
		value: parseSourceValue(value_func_id, value_prop_id, value),
	};
	return body;
};
const _parseValueSourceFuncs = {
	[SOURCE_DB.id]: _parseValueDb,
	[SOURCE_PROXY_PASS.id]: _parseValueProxy,
	[SOURCE_HEADER.id]: _parseValueServer('header'),
	[SOURCE_REQUEST.id]: _parseValueServer('request'),
	[SOURCE_COOKIE.id]: _parseValueServer('cookie'),
	[SOURCE_PLACEHOLDER.id]: _parseValuePlaceholder,
};

const onMount = async (id) => {
	const prop = Store().getState().prop;

	onLoader(true);

	try {
		const response = await fetchPropOne(id);
		const data = ((response || {}).data || {}).data || {};
		const body = {};

		data.values.forEach((valueItem) => {
			_parseValueSourceFuncs[valueItem.source_id]
				? _parseValueSourceFuncs[valueItem.source_id](valueItem, body)
				: (body[valueItem.id] = valueItem.value || '');

		});
		prop.id = id;
		prop.name = data.name;
		prop.body = body;
		
		Store().dispatch({
			type: 'prop',
			payload: () => prop,
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
};

export default onMount;
