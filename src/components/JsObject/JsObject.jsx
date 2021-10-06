import React from 'react';
import { useSelector } from 'react-redux';
import Parent from './Parent';
import onMount from './onMount.js';

let JsObject = ({ 
	typeId,
	KeyComponent,
	ValueComponent,
	TypeComponent,
	onMerge,
}) => {
	const wrapperIsset = useSelector((state) => !!state.jsObject.data[0]);
	const _typeId = useSelector((state) => (state.jsObject.data[0] || {}).type_id ?? typeId);
	const _typeIdMemo = React.useMemo(() => typeId, [
		typeId,
	]);

	React.useEffect(() => onMount(_typeIdMemo), [
		_typeIdMemo,
	]);

	return wrapperIsset
		? <Parent
			id={0}
			typeId={_typeId}
			KeyComponent={KeyComponent}
			ValueComponent={ValueComponent}
			TypeComponent={TypeComponent}
			onMerge={onMerge} />
		: <React.Fragment />;
};

JsObject = React.memo(JsObject);
JsObject.defaultProps = {
	typeId: 0,
	onMerge: () => {},
};

export default JsObject;
