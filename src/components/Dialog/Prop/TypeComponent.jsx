import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import JsBoxControlWrapper from 'components/JsObject/BoxControlWrapper';
import SelectType from 'components/Select/Type';
import { FORMAT_ATOMIC } from 'structures/format.js';
import columnTypes, { 
	COLUMN_ID,
	COLUMN_OBJ,
	COLUMN_ARR,
	COLUMN_NUMBER,
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
			{columnTypes[typeId === COLUMN_ID.id
				? COLUMN_NUMBER.id
				: typeId].text()}
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
					disabled={disabledType}
					name={'type_id-'+ id}
					value={typeId === COLUMN_ID.id
						? COLUMN_NUMBER.id
						: typeId}
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
	onSelect: () => {},
};

export default TypeComponent;
