import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Store from 'components/Store';
import protocol from 'structures/protocol.js';
import method from 'structures/method.js';
import { SOURCE_PROXY_PASS } from 'structures/source.js';
import { 
	COLUMN_NUMBER,
	COLUMN_TEXT, 
	COLUMN_OBJ,
	COLUMN_ARR,
} from 'structures/columnTypes.js';
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
	typeId,
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
			value={typeId} />
		<Divider
			parentId={parentId}
			id={id} />
		<Values
			widthDefault={widthDefault}
			typeId={typeId}
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
}) => {
	const key = useSelector((state) => (((state.jsObject.data[id] || {}).value || {}).columns || {})[columnId]);
	const dbColumnsData = Store().getState().dbColumns.data;
	const _onChangeKey = React.useCallback((e) => onChangeKey(e, id, columnId), [
		id,
		columnId,
	]);

	return <ComplexItem
		widthDefault
		parentId={parentId}
		id={id}
		KeyComponent={KeyComponent}
		TypeComponent={TypeComponent}
		typeId={dbColumnsData[columnId].type_id}
		keyValue={key}
		value={dbColumnsData[columnId].default_value}
		onChangeKey={_onChangeKey} />;
};
ComplexItemDb = React.memo(ComplexItemDb);
ComplexItemDb.defaultProps = {
	id: 0,
	parentId: 0,
	columnId: 0,
};

let ComplexItemProxy = ({
	id,
	parentId,
	last,
	KeyComponent,
	ValueComponent,
	TypeComponent,
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
	const typeId = route.response[responseKeys[0]].type_id;

	return <React.Fragment>
		<ComplexItem
			parentId={parentId}
			id={id}
			KeyComponent={KeyComponent}
			TypeComponent={TypeComponent}
			typeId={COLUMN_NUMBER.id}
			keyValue={keyStatusCode}
			onChangeKey={_onChangeStatusCode}
			value="200, ..., 524" />
		<ComplexItem
			parentId={parentId}
			id={id}
			KeyComponent={KeyComponent}
			TypeComponent={TypeComponent}
			typeId={COLUMN_TEXT.id}
			keyValue={keyUri}
			onChangeKey={_onChangeUri}
			value={(protocol[route.protocol_id].text() +'://'+ route.domain_path + route.path.map((pathItem) => pathItem.type_id === 2
				? ('/'+ placeholder[pathItem.id].value)
				: ('/'+ pathItem.value))).replaceAll(',', '')} />
		<ComplexItem
			parentId={parentId}
			id={id}
			KeyComponent={KeyComponent}
			TypeComponent={TypeComponent}
			typeId={COLUMN_TEXT.id}
			keyValue={keyMethod}
			onChangeKey={_onChangeMethod}
			value={method[route.method_id].name} />
		{/*(headerId > 0 && headerParentId > 0)
			? <ComplexItem
				parentId={parentId}
				id={id}
				KeyComponent={KeyComponent}
				TypeComponent={TypeComponent}
				typeId={COLUMN_OBJ.id}
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
				typeId={typeId}
				keyValue={keyData}
				onChangeKey={_onChangeData}
				value={() => <Value
					parentId={(typeId !== COLUMN_ARR.id && typeId !== COLUMN_OBJ.id)
						? dataId
						: dataParentId}
					id={(typeId !== COLUMN_ARR.id && typeId !== COLUMN_OBJ.id)
						? firstChildId
						: dataId}
					KeyComponent={KeyComponent}
					ValueComponent={ValueComponent}
					TypeComponent={TypeComponent} />} />
			: <React.Fragment />}
	</React.Fragment>;
};
ComplexItemProxy = React.memo(ComplexItemProxy);
ComplexItemProxy.defaultProps = {
	id: 0,
	parentId: 0,
	columnId: 0,
};

let ComplexValue = ({
	id,
	parentId,
	last,
	KeyComponent,
	ValueComponent,
	TypeComponent,
	className,
}) => {
	const isCollection = useSelector((state) => ((state.jsObject.data[id] || {}).value || {}).is_collection);
	const columnsKeys = useSelector((state) => Object.keys(((state.jsObject.data[id] || {}).value || {}).columns || {}));
	const isSourceProxyPass = useSelector((state) => ((state.jsObject.data[id] || {}).value || {}).source_id === SOURCE_PROXY_PASS.id);

	return <React.Fragment>
		{isCollection
			? <React.Fragment />
			: <ComplexChip id={id} />}
		{isSourceProxyPass
			? <ComplexItemProxy
				id={id}
				parentId={parentId}
				KeyComponent={KeyComponent}
				ValueComponent={ValueComponent}
				TypeComponent={TypeComponent} />
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
							TypeComponent={TypeComponent} />);
					i++;
				}
				return collector;
			})()}
	</React.Fragment>;
};

ComplexValue = React.memo(ComplexValue);
ComplexValue.defaultProps = {
	id: 0,
	parentId: 0,
};

export default ComplexValue;
