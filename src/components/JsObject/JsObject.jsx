import React from 'react';
import { useSelector } from 'react-redux';
import Store from 'components/Store';
import { DATA_TYPE_ATOMIC } from 'structures/dataTypes.js';
import Parent from './Parent';
import onMount from './onMount.js';

let JsObject = ({ 
	KeyComponent,
	ValueComponent,
	TypeComponent,
	onMerge,
}) => {
	const wrapperIsset = useSelector((state) => !!state.jsObject.data[0]);
	const _dataTypeId = useSelector((state) => (state.jsObject.data[0] || {}).data_type_id ?? DATA_TYPE_ATOMIC.id);
	const _propIdMemo = React.useMemo(() => Store().getState().prop.id ?? 0, [
	]);
	const _dataTypeIdMemo = React.useMemo(() => (Store().getState().jsObject.data[0] || {}).data_type_id ?? DATA_TYPE_ATOMIC.id, [
	]);

	React.useEffect(() => onMount(_propIdMemo, _dataTypeIdMemo), [
		_propIdMemo,
		_dataTypeIdMemo,
	]);

	return wrapperIsset
		? <Parent
			id={0}
			dataTypeId={_dataTypeId}
			KeyComponent={KeyComponent}
			ValueComponent={ValueComponent}
			TypeComponent={TypeComponent}
			onMerge={onMerge} />
		: <React.Fragment />;
};

JsObject = React.memo(JsObject);
JsObject.defaultProps = {
	onMerge: () => {},
};

export default JsObject;
