import React from 'react';
import { useSelector } from 'react-redux';
import Wrapper from './Wrapper';
import onMount from './onMount.js';

let JsObject = ({ 
	typeId,
	KeyComponent,
	ValueComponent,
	TypeComponent,
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
		? <Wrapper
			id={0}
			typeId={_typeId}
			KeyComponent={KeyComponent}
			ValueComponent={ValueComponent}
			TypeComponent={TypeComponent} />
		: <React.Fragment />;
};

JsObject = React.memo(JsObject);
JsObject.defaultProps = {
	typeId: 0,
};

export default JsObject;
