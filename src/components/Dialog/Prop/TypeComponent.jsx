import React from 'react';
import Typography from '@material-ui/core/Typography';
import JsBoxControlWrapper from 'components/JsObject/BoxControlWrapper';
import SelectType from 'components/Select/Type';
import { FORMAT_ATOMIC } from 'structures/format.js';
import columnTypes, { 
	COLUMN_ID,
	COLUMN_OBJ,
	COLUMN_ARR,
} from 'structures/columnTypes.js';

const _onFilterTypes = (parentTypeId) => (key) => (
	parentTypeId === FORMAT_ATOMIC.id
		? (columnTypes[key].id !== COLUMN_ID.id
			&& columnTypes[key].id !== COLUMN_OBJ.id
			&& columnTypes[key].id !== COLUMN_ARR.id)
	: columnTypes[key].id !== COLUMN_ID.id
);

let TypeComponent = ({
	parentTypeId,
	id,
	typeId,
	disabledWrapper,
	disabled,
	onSelect,
}) => {
	return (disabled || disabledWrapper)
		? <Typography 
			variant="subtitle1"
			color="textSecondary"
			style={{
				height: 56,
				lineHeight: '56px',
				textAlign: 'center',
			}}>
			{columnTypes[typeId].text()}
		</Typography>
		: <JsBoxControlWrapper
			data-border_left_radius_0={(parentTypeId !== FORMAT_ATOMIC.id
				&& parentTypeId !== COLUMN_ARR.id)
				|| (parentTypeId === FORMAT_ATOMIC.id 
				&& parentTypeId === COLUMN_OBJ.id)}
			data-border_right_radius_0={parentTypeId === FORMAT_ATOMIC.id 
				&& parentTypeId !== COLUMN_OBJ.id
				&& parentTypeId !== COLUMN_ARR.id}
			mt="0px">
				<SelectType 
					disabled={disabledWrapper}
					name={'type_id-'+ id}
					value={typeId}
					onSelect={onSelect}
					onFilter={_onFilterTypes(parentTypeId)}
					label="" />
			</JsBoxControlWrapper>;
};
TypeComponent = React.memo(TypeComponent);
TypeComponent.defaultProps = {
	parentTypeId: 0,
	id: 0,
	typeId: 0,
	disabledWrapper: false,
	onSelect: () => {},
};

export default TypeComponent;
