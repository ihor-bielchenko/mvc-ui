import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import JsBoxControlWrapper from 'components/JsObject/BoxControlWrapper';
import SelectDataType from 'components/Select/DataType';
import dataTypes, { 
	DATA_TYPE_ATOMIC,
	DATA_TYPE_ID,
	DATA_TYPE_NUMBER,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
} from 'structures/dataTypes.js';

const _onFilterTypes = (parentDataTypeId) => (key) => {
	return parentDataTypeId === DATA_TYPE_ATOMIC.id
		? (dataTypes[key].id !== DATA_TYPE_ID.id
			&& dataTypes[key].id !== DATA_TYPE_OBJECT.id
			&& dataTypes[key].id !== DATA_TYPE_ARRAY.id
			&& dataTypes[key].id !== DATA_TYPE_ATOMIC.id)
	: (dataTypes[key].id !== DATA_TYPE_ID.id
		&& dataTypes[key].id !== DATA_TYPE_ATOMIC.id)
};

let TypeComponent = ({
	parentDataTypeId,
	id,
	dataTypeId,
	onSelect,
}) => {
	const disabledType = useSelector((state) => state.jsObject.data[id].disabledType);

	return disabledType
		? <Typography 
			variant="body1"
			color="textSecondary"
			style={{
				height: 56,
				lineHeight: '56px',
				textAlign: 'center',
			}}>
			{dataTypes[dataTypeId === DATA_TYPE_ID.id
				? DATA_TYPE_NUMBER.id
				: dataTypeId].text()}
		</Typography>
		: <JsBoxControlWrapper
			data-border_left_radius_0={(parentDataTypeId !== DATA_TYPE_ATOMIC.id
				&& parentDataTypeId !== DATA_TYPE_ARRAY.id)
				|| (parentDataTypeId === DATA_TYPE_ATOMIC.id 
				&& parentDataTypeId === DATA_TYPE_OBJECT.id)}
			data-border_right_radius_0={parentDataTypeId === DATA_TYPE_ATOMIC.id 
				&& parentDataTypeId !== DATA_TYPE_OBJECT.id
				&& parentDataTypeId !== DATA_TYPE_ARRAY.id}
			mt="0px">
				<SelectDataType 
					disabled={disabledType}
					name={'data_type_id-'+ id}
					value={dataTypeId === DATA_TYPE_ID.id
						? DATA_TYPE_NUMBER.id
						: dataTypeId}
					onSelect={onSelect}
					onFilter={_onFilterTypes(parentDataTypeId)}
					label="" />
			</JsBoxControlWrapper>;
};
TypeComponent = React.memo(TypeComponent);
TypeComponent.defaultProps = {
	parentDataTypeId: 0,
	id: 0,
	dataTypeId: 0,
	onSelect: () => {},
};

export default TypeComponent;
