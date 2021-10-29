import React from 'react';
import { useSelector } from 'react-redux';
import Store from 'components/Store';
import { DATA_TYPE_ATOMIC } from 'structures/dataTypes.js';
import { 
	DIALOG_PROP,
	DIALOG_JSON,
	DIALOG_FUNC, 
} from 'consts/dialog.js';
import Parent from './Parent';
import onMount from './onMount.js';

let JsObject = ({ 
	KeyComponent,
	ValueComponent,
	TypeComponent,
	onMerge,
}) => {
	const wrapperIsset = useSelector((state) => !!state.jsObject.data[0]);
	const _sourceId = useSelector((state) => state.prop.sourceId
		|| state.json.sourceId
		|| state.func.sourceId);
	const _dataTypeId = useSelector((state) => (state.jsObject.data[0] || {}).data_type_id ?? DATA_TYPE_ATOMIC.id);
	const _issetFlag = React.useMemo(() => ((Store().getState().dialogs[DIALOG_PROP] || {}).id
		?? (Store().getState().dialogs[DIALOG_JSON] || {}).id
		?? (Store().getState().dialogs[DIALOG_FUNC] || {}).id) > 0, [
	]);
	const _dataTypeIdMemo = React.useMemo(() => (Store().getState().jsObject.data[0] || {}).data_type_id ?? DATA_TYPE_ATOMIC.id, [
	]);

	React.useEffect(() => _issetFlag && _sourceId > 0
		? onMount(_sourceId, _dataTypeIdMemo)
		: (!_issetFlag) && onMount(0, _dataTypeIdMemo), [
		_issetFlag,
		_sourceId,
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
