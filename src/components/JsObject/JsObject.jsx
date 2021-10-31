import React from 'react';
import { useSelector } from 'react-redux';
import Store from 'components/Store';
import { 
	DATA_TYPE_ATOMIC,
	DATA_TYPE_OBJECT, 
} from 'structures/dataTypes.js';
import { 
	DIALOG_PROP,
	DIALOG_JSON,
	DIALOG_IF,
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
	const _dataTypeId = useSelector((state) => (state.jsObject.data[0] || {}).data_type_id 
		?? (!!state.dialogs[DIALOG_FUNC] || !!state.dialogs[DIALOG_IF]
			? DATA_TYPE_OBJECT.id
			: DATA_TYPE_ATOMIC.id));
	const _issetFlag = React.useMemo(() => {
		const dialogs = Store().getState().dialogs;

		return ((dialogs[DIALOG_PROP] || {}).id
			?? (dialogs[DIALOG_JSON] || {}).id
			?? (dialogs[DIALOG_FUNC] || {}).id
			?? (dialogs[DIALOG_IF] || {}).id) > 0;
	}, [
	]);
	const _dataTypeIdMemo = React.useMemo(() => {
		const {
			jsObject,
			dialogs,
		} = Store().getState();
		const dataTypeId = (jsObject.data[0] || {}).data_type_id;

		return dataTypeId 
			?? (!!dialogs[DIALOG_FUNC] || !!dialogs[DIALOG_IF]
				? DATA_TYPE_OBJECT.id
				: DATA_TYPE_ATOMIC.id);
	}, []);

	React.useEffect(() => {
		if (_issetFlag && _sourceId > 0) {
			onMount(_sourceId, _dataTypeIdMemo);
		}
		else if (!_issetFlag) {
			onMount(0, _dataTypeIdMemo);
		}
	}, [
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
