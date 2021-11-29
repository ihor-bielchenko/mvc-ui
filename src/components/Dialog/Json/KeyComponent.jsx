import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import JsBoxControlWrapper from 'components/JsObject/BoxControlWrapper';
import InputText from 'components/Input/Text';
import onValidate from 'components/Input/Validate/keyStr.js';
import { DATA_TYPE_ARRAY } from 'structures/dataTypes.js';

let KeyComponent = ({
	parentId,
	parentDataTypeId,
	id,
	dataTypeId,
	value,
	onChange,
}) => {
	const disabledKey = useSelector((state) => state.jsObject.data[id].disabledKey);
	const disabledType = useSelector((state) => state.jsObject.data[id].disabledType);

	return (parentDataTypeId === DATA_TYPE_ARRAY.id || disabledKey)
		? <Typography 
			variant="body1"
			color="primary"
			style={{
				height: 56,
				lineHeight: '56px'
			}}>
			{(value || '').toString()}
		</Typography>
		: <JsBoxControlWrapper 
			mt="0px"
			data-border_right_radius_0={!disabledType}
			data-border_right_hide={!disabledType}>
			<InputText
				menu
				onMenu={() => {}}
				disabled={disabledKey}
				name={'key-'+ id}
				id={'key-'+ id}
				value={(value || '').toString()}
				onChange={onChange}
				onInput={onValidate}
				label="" />
		</JsBoxControlWrapper>;
};

KeyComponent = React.memo(KeyComponent);
KeyComponent.defaultProps = {
	parentId: 0,
	parentDataTypeId: 0,
	id: 0,
	dataTypeId: 0,
	value: '',
	onChange: () => {},
};

export default KeyComponent;
