import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import JsBoxControlWrapper from 'components/JsObject/BoxControlWrapper';
import MenuSource from 'components/Menu/Source';
import onDialog from 'components/Dialog/onDialog.js';
import onValidateSource from 'components/Group/Func/onValidate.js';
import loadColumnInputs from 'utils/loadColumnInputs.js';
import { SOURCE_TYPE_SCRIPT } from 'structures/sourceTypes.js';
import { 
	DATA_TYPE_ATOMIC,
	DATA_TYPE_ID,
	DATA_TYPE_NUMBER, 
	DATA_TYPE_TEXT,
	DATA_TYPE_RICHTEXT,
	DATA_TYPE_EMAIL,
	DATA_TYPE_IP,
	DATA_TYPE_MAC,
	DATA_TYPE_URL,
	DATA_TYPE_PASSWORD,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
	DATA_TYPE_NULL,
} from 'structures/dataTypes.js';
import onValueScript from './onValueScript.js';
import onClear from './onClear.js';

let ValueComponent = ({
	scriptId,
	workspaceId,
	parentId,
	parentDataTypeId,
	id,
	dataTypeId,
	value,
	onChange,
}) => {
	const Component = React.useMemo(() => React.lazy(loadColumnInputs(dataTypeId)), [
		dataTypeId,
	]);
	const disabledValue = useSelector((state) => state.jsObject.data[id].disabledValue);
	const _dataTypeId = dataTypeId === DATA_TYPE_ID.id
		? DATA_TYPE_NUMBER.id
		: dataTypeId;
	const _onClear = React.useCallback((e) => onClear(e, id), [
		id,
	]);
	const _onMenu = React.useCallback((e) => onDialog(SOURCE_TYPE_SCRIPT.id, {
		onClickAsSource: onValueScript(id),
		dataTypeValidating: onValidateSource(_dataTypeId === DATA_TYPE_PASSWORD.id
			? ([
				DATA_TYPE_TEXT.id,
				DATA_TYPE_RICHTEXT.id,
				DATA_TYPE_EMAIL.id,
				DATA_TYPE_IP.id,
				DATA_TYPE_MAC.id,
				DATA_TYPE_URL.id,
				DATA_TYPE_PASSWORD.id,
			])
			: _dataTypeId),
	})(e), [
		id,
		_dataTypeId,
	]);

	return <JsBoxControlWrapper 
		position="relative"
		width="100%"
		minWidth="max-content"
		maxWidth={(parentId === 0 && parentDataTypeId === DATA_TYPE_ATOMIC.id)
			? 'inherit'
			: 'max-content'}
		data-border_left_radius_0={!(parentDataTypeId !== DATA_TYPE_ATOMIC.id 
			|| parentDataTypeId === DATA_TYPE_OBJECT.id
			|| parentDataTypeId === DATA_TYPE_ARRAY.id)}
		data-border_left_hide={!(parentDataTypeId !== DATA_TYPE_ATOMIC.id 
			|| parentDataTypeId === DATA_TYPE_OBJECT.id
			|| parentDataTypeId === DATA_TYPE_ARRAY.id)}>
			{(() => {
				switch (_dataTypeId) {
					case DATA_TYPE_OBJECT.id:
					case DATA_TYPE_ARRAY.id:
						return value;
					case DATA_TYPE_NULL.id:
						return <Typography 
							variant="h5"
							color="textSecondary"
							style={{
								height: 56,
								lineHeight: '56px'
							}}>
							<i><b>NULL</b></i>
						</Typography>;
					default:
						return <React.Fragment>
							<Box mt="0px">
								<React.Suspense fallback={<Typography>Подождите...</Typography>}>
									<Component
										menu
										onMenu={_onMenu}
										onValue={_onMenu}
										onDelete={_onClear}
										onChange={onChange}
										disabled={disabledValue}
										name={id.toString()}
										id={id.toString()}
										defaultValue={value}
										label="" />
								</React.Suspense>
							</Box>
							<MenuSource 
								aria={id.toString()}
								scriptId={scriptId}
								workspaceId={workspaceId} />
						</React.Fragment>;
					}
			})()}
		</JsBoxControlWrapper>;
};
ValueComponent = React.memo(ValueComponent);
ValueComponent.defaultProps = {
	scriptId: 0,
	workspaceId: 0,
	parentId: 0,
	parentDataTypeId: 0,
	id: 0,
	dataTypeId: 0,
	value: '',
	onChange: () => {},
};

export default ValueComponent;
