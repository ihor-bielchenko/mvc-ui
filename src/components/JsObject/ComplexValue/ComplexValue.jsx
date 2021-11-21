import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Store from 'components/Store';
import protocol from 'structures/protocol.js';
import method from 'structures/method.js';
import { 
	SOURCE_TYPE_PROXY_PASS,
	SOURCE_TYPE_SCRIPT, 
} from 'structures/sourceTypes.js';
import { 
	DATA_TYPE_NUMBER,
	DATA_TYPE_TEXT, 
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
} from 'structures/dataTypes.js';
import Remove from '../Remove';
import Key from '../Key';
import Type from '../Type';
import Divider from '../Divider';
import ComplexChip from '../ComplexChip';
import Value from '../Value';
import Values from './Values.jsx';
import onChangeKey from './onChangeKey.js';

let ComplexItem = ({
	id,
	parentId,
	last,
	KeyComponent,
	ValueComponent,
	TypeComponent,
	onChangeKey,
	dataTypeId,
	keyValue,
	value,
	widthDefault,
}) => {
	return <Box
		position="relative"
		display="flex"
		alignItems="flex-start"
		width="100%"
		maxWidth="max-content"
		pb={1}>
		<Remove
			parentId={parentId}
			id={id} />
		<Key
			parentId={parentId}
			id={id}
			KeyComponent={KeyComponent}
			value={keyValue}
			onChange={onChangeKey} />
		<Type
			parentId={parentId}
			id={id}
			TypeComponent={TypeComponent}
			value={dataTypeId} />
		<Divider
			parentId={parentId}
			id={id} />
		<Values
			widthDefault={widthDefault}
			dataTypeId={dataTypeId}
			value={value}
			last={last} />
	</Box>;
};
ComplexItem = React.memo(ComplexItem);
ComplexItem.defaultProps = {
	id: 0,
	parentId: 0,
	columnId: 0,
	widthDefault: false,
	onChangeKey: () => {},
};

let ComplexItemDb = ({
	id,
	parentId,
	last,
	KeyComponent,
	ValueComponent,
	TypeComponent,
	columnId,
	onMenuComplexValue,
}) => {
	const key = useSelector((state) => (((state.jsObject.data[id] || {}).value || {}).columns || {})[columnId]);
	const dbColumnsData = Store().getState().db.columns;
	const _onChangeKey = React.useCallback((e) => onChangeKey(e, id, columnId), [
		id,
		columnId,
	]);

	console.log('dbColumnsData', dbColumnsData, columnId);

	return dbColumnsData[columnId]
		? <ComplexItem
			widthDefault
			parentId={parentId}
			id={id}
			KeyComponent={KeyComponent}
			TypeComponent={TypeComponent}
			dataTypeId={dbColumnsData[columnId].data_type_id}
			keyValue={key}
			value={dbColumnsData[columnId].default_value}
			onChangeKey={_onChangeKey}
			onMenuComplexValue={onMenuComplexValue} />
		: <React.Fragment />;
};
ComplexItemDb = React.memo(ComplexItemDb);
ComplexItemDb.defaultProps = {
	id: 0,
	parentId: 0,
	columnId: 0,
	onMenuComplexValue: () => {},
};

let ComplexItemProxy = ({
	id,
	parentId,
	last,
	KeyComponent,
	ValueComponent,
	TypeComponent,
	onMenuComplexValue,
}) => {
	const keyStatusCode = useSelector((state) => (((state.jsObject.data[id] || {}).value || {}).columns || {}).statusCode);
	const keyUri = useSelector((state) => (((state.jsObject.data[id] || {}).value || {}).columns || {}).uri);
	const keyMethod = useSelector((state) => (((state.jsObject.data[id] || {}).value || {}).columns || {}).method);
	// const headers = useSelector((state) => (((state.jsObject.data[id] || {}).value || {}).columns || {}).headers);
	const keyData = useSelector((state) => (((state.jsObject.data[id] || {}).value || {}).columns || {}).data);
	const placeholder = useSelector((state) => ((state.jsObject.data[id] || {}).value || {}).placeholder);
	const routeId = useSelector((state) => ((state.jsObject.data[id] || {}).value || {}).route_id);
	// const headerId = useSelector((state) => ((state.jsObject.blocks[id] || [])[0] || {}).id);
	// const headerParentId = useSelector((state) => ((state.jsObject.blocks[id] || [])[0] || {}).parent_id);
	const dataId = useSelector((state) => ((state.jsObject.blocks[id] || [])[0] || {}).id);
	const dataParentId = useSelector((state) => ((state.jsObject.blocks[id] || [])[0] || {}).parent_id);
	const firstChildId = useSelector((state) => ((state.jsObject.blocks[dataId] || [])[0] || {}).id);
	const _onChangeStatusCode = React.useCallback((e) => onChangeKey(e, id, 'statusCode'), [
		id,
	]);
	const _onChangeUri = React.useCallback((e) => onChangeKey(e, id, 'uri'), [
		id,
	]);
	const _onChangeMethod = React.useCallback((e) => onChangeKey(e, id, 'method'), [
		id,
	]);
	// const _onChangeHeaders = React.useCallback((e) => onChangeKey(e, id, 'headers'), [
	// 	id,
	// ]);
	const _onChangeData = React.useCallback((e) => onChangeKey(e, id, 'data'), [
		id,
	]);
	const routes = Store().getState().routes;
	const routesData = routes.data;
	const route = routesData.find((item) => item.id === routeId);
	const responseKeys = Object.keys(route.response);
	const dataTypeId = route.response[responseKeys[0]].data_type_id;

	return <React.Fragment>
		<ComplexItem
			parentId={parentId}
			id={id}
			KeyComponent={KeyComponent}
			TypeComponent={TypeComponent}
			dataTypeId={DATA_TYPE_NUMBER.id}
			keyValue={keyStatusCode}
			onChangeKey={_onChangeStatusCode}
			value="200, ..., 524" />
		<ComplexItem
			parentId={parentId}
			id={id}
			KeyComponent={KeyComponent}
			TypeComponent={TypeComponent}
			dataTypeId={DATA_TYPE_TEXT.id}
			keyValue={keyUri}
			onChangeKey={_onChangeUri}
			value={(protocol[route.protocol_id].text() +'://'+ route.domain_path + route.path.map((pathItem) => pathItem.data_type_id === 2
				? ('/'+ placeholder[pathItem.id].value)
				: ('/'+ pathItem.value))).replaceAll(',', '')} />
		<ComplexItem
			parentId={parentId}
			id={id}
			KeyComponent={KeyComponent}
			TypeComponent={TypeComponent}
			dataTypeId={DATA_TYPE_TEXT.id}
			keyValue={keyMethod}
			onChangeKey={_onChangeMethod}
			value={method[route.method_id].name} />
		{/*(headerId > 0 && headerParentId > 0)
			? <ComplexItem
				parentId={parentId}
				id={id}
				KeyComponent={KeyComponent}
				TypeComponent={TypeComponent}
				typeId={DATA_TYPE_OBJECT.id}
				keyValue={headers}
				onChangeKey={_onChangeHeaders}
				value={() => <Value
					parentId={headerParentId}
					id={headerId}
					KeyComponent={KeyComponent}
					ValueComponent={ValueComponent}
					TypeComponent={TypeComponent} />} />
			: <React.Fragment />*/}
		{(dataId > 0 && dataParentId > 0)
			? <ComplexItem
				parentId={parentId}
				id={id}
				KeyComponent={KeyComponent}
				TypeComponent={TypeComponent}
				dataTypeId={dataTypeId}
				keyValue={keyData}
				onChangeKey={_onChangeData}
				value={() => <Value
					parentId={(dataTypeId !== DATA_TYPE_ARRAY.id && dataTypeId !== DATA_TYPE_OBJECT.id)
						? dataId
						: dataParentId}
					id={(dataTypeId !== DATA_TYPE_ARRAY.id && dataTypeId !== DATA_TYPE_OBJECT.id)
						? firstChildId
						: dataId}
					KeyComponent={KeyComponent}
					ValueComponent={ValueComponent}
					TypeComponent={TypeComponent}
					onMenuComplexValue={onMenuComplexValue} />} />
			: <React.Fragment />}
	</React.Fragment>;
};
ComplexItemProxy = React.memo(ComplexItemProxy);
ComplexItemProxy.defaultProps = {
	id: 0,
	parentId: 0,
	onMenuComplexValue: () => {},
};

let ComplexItemScript = ({
	id,
	parentId,
	last,
	KeyComponent,
	ValueComponent,
	TypeComponent,
	onMenuComplexValue,
}) => {
	const blocks = Store().getState().jsObject.blocks;
	const blocksItemLength = useSelector((state) => (state.jsObject.blocks[id] || []).length);
	let i = 0,
		collector = [];

	while (i < blocksItemLength) {
		const item = (blocks[id] || [])[i];

		if (item) {
			collector.push(<ComplexItem
				key={item.id}
				parentId={item.parent_id}
				id={item.id}
				KeyComponent={KeyComponent}
				TypeComponent={TypeComponent}
				dataTypeId={item.data_type_id}
				keyValue={item.key}
				value={() => <Value
					parentId={item.parent_id}
					id={item.id}
					KeyComponent={KeyComponent}
					ValueComponent={ValueComponent}
					TypeComponent={TypeComponent}
					onMenuComplexValue={onMenuComplexValue} />} />);
		}
		i++;
	}

	return <React.Fragment>
		{collector}
	</React.Fragment>;
};
ComplexItemScript = React.memo(ComplexItemScript);
ComplexItemScript.defaultProps = {
	id: 0,
	parentId: 0,
	onMenuComplexValue: () => {},
};

let ComplexValue = ({
	scriptId,
	workspaceId,
	id,
	parentId,
	last,
	KeyComponent,
	ValueComponent,
	TypeComponent,
	MergeComponent,
	className,
	onMenuComplexValue,
}) => {
	const isCollection = useSelector((state) => ((state.jsObject.data[id] || {}).value || {}).is_collection);
	const columnsKeys = useSelector((state) => Object.keys(((state.jsObject.data[id] || {}).value || {}).columns || {}));
	const isSourceProxyPass = useSelector((state) => ((state.jsObject.data[id] || {}).value || {}).source_type_id === SOURCE_TYPE_PROXY_PASS.id);
	const isSourceScript = useSelector((state) => ((state.jsObject.data[id] || {}).value || {}).source_type_id === SOURCE_TYPE_SCRIPT.id);

	return <React.Fragment>
		{isCollection
			? <React.Fragment />
			: <ComplexChip 
				scriptId={scriptId}
				workspaceId={workspaceId}
				id={id}
				onMenuComplexValue={onMenuComplexValue} />}
		{isSourceScript
			? <ComplexItemScript
				id={id}
				parentId={parentId}
				KeyComponent={KeyComponent}
				ValueComponent={ValueComponent}
				TypeComponent={TypeComponent}
				onMenuComplexValue={onMenuComplexValue} />
			: isSourceProxyPass
				? <ComplexItemProxy
					id={id}
					parentId={parentId}
					KeyComponent={KeyComponent}
					ValueComponent={ValueComponent}
					TypeComponent={TypeComponent}
					onMenuComplexValue={onMenuComplexValue} />
				: (() => {
					const columnsLength = columnsKeys.length;
					let i = 0,
						collector = [];

					while (i < columnsLength) {
						const _columnId = Number(columnsKeys[i]);

						collector.push(
							<ComplexItemDb 
								key={id +'-'+ _columnId}
								id={id}
								parentId={parentId}
								columnId={_columnId}
								last={i === columnsLength - 1 && last}
								KeyComponent={KeyComponent}
								ValueComponent={ValueComponent}
								TypeComponent={TypeComponent}
								onMenuComplexValue={onMenuComplexValue} />);
						i++;
					}
					return collector;
				})()}
	</React.Fragment>;
};

ComplexValue = React.memo(ComplexValue);
ComplexValue.defaultProps = {
	scriptId: 0,
	workspaceId: 0,
	id: 0,
	parentId: 0,
	onMenuComplexValue: () => {},
};

export default ComplexValue;
