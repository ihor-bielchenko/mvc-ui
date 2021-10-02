import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
	COLUMN_NUMBER,
	COLUMN_BOOLEAN,
	COLUMN_OBJ,
	COLUMN_ARR,
	COLUMN_NULL,
} from 'structures/columnTypes.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import BoxControlWrapper from '../BoxControlWrapper.jsx';
import Wrapper from '../Wrapper';
import onChangeLocal from './onChange.js';

let Value = ({
	parentId,
	id,
	parentTypeId,
	typeId,
	value,
	KeyComponent,
	TypeComponent,
	ValueComponent,
	last,
	onChange,
}) => {
	const _parentTypeId = useSelector((state) => parentTypeId ?? (state.jsObject.data[parentId] || {}).type_id);
	const _typeId = useSelector((state) => typeId ?? (state.jsObject.data[id] || {}).type_id);
	const _value = useSelector((state) => value ?? (state.jsObject.data[id] || {}).value);
	const _onChange = React.useCallback((e) => typeof onChange === 'function'
		? onChange(e, id)
		: onChangeLocal(e, id), [
		id,
		onChange,
	]);

	return <React.Fragment>
		{typeof ValueComponent === 'object'
			&& typeof ValueComponent['$$typeof'] === 'symbol'
			? <ValueComponent
				parentId={parentId}
				parentTypeId={_parentTypeId}
				id={id}
				typeId={_typeId}
				value={(() => {
					switch (_typeId) {
						case COLUMN_OBJ.id:
						case COLUMN_ARR.id:
							return <Wrapper
								id={id}
								typeId={_typeId}
								last={last}
								KeyComponent={KeyComponent}
								ValueComponent={ValueComponent}
								TypeComponent={TypeComponent} />;
						default:
							return _value;
					}
				})()}
				onChange={_onChange} />
			: <BoxControlWrapper 
				position="relative"
				width="100%"
				minWidth="max-content"
				maxWidth={(parentId === 0 && _parentTypeId === FORMAT_ATOMIC.id)
					? 'inherit'
					: 'max-content'}
				data-border_left_radius_0={!(_parentTypeId !== FORMAT_ATOMIC.id 
					|| _parentTypeId === COLUMN_OBJ.id
					|| _parentTypeId === COLUMN_ARR.id)}
				data-border_left_hide={!(_parentTypeId !== FORMAT_ATOMIC.id 
					|| _parentTypeId === COLUMN_OBJ.id
					|| _parentTypeId === COLUMN_ARR.id)}>
				{(() => {
					switch (_typeId) {
						case COLUMN_OBJ.id:
						case COLUMN_ARR.id:
							return <Wrapper
								id={id}
								typeId={_typeId}
								last={last}
								KeyComponent={KeyComponent}
								ValueComponent={ValueComponent}
								TypeComponent={TypeComponent} />;
						case COLUMN_NULL.id:
							return <Typography color="textSecondary">
								<i><b>NULL</b></i>
							</Typography>;
						case COLUMN_NUMBER.id:
							return <Typography color="primary">
								{_value.toString()}
							</Typography>;
						case COLUMN_BOOLEAN.id:
							return <Typography 
								color={_value
									? 'primary'
									: 'secondary'}>
								{_value.toString().toUpperCase()}
							</Typography>;
						default:
							return <Typography>
								{_value.toString()}
							</Typography>;
					}
				})()}
			</BoxControlWrapper>}
		{last || (_typeId === COLUMN_OBJ.id
			|| _typeId === COLUMN_ARR.id)
			? <React.Fragment />
			: <Box 
				position="relative"
				textAlign="center"
				minWidth="8px"
				maxWidth="8px"
				pt="12px">
				<Typography variant="h5">
					,
				</Typography>
			</Box>}
	</React.Fragment>;
};

Value = React.memo(Value);
Value.defaultProps = {
	parentId: 0,
	id: 0,
};

export default Value;
