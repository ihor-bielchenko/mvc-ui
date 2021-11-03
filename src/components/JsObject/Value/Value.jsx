import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
	DATA_TYPE_ATOMIC,
	DATA_TYPE_NUMBER,
	DATA_TYPE_BOOLEAN,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
	DATA_TYPE_NULL,
} from 'structures/dataTypes.js';
import BoxControlWrapper from '../BoxControlWrapper.jsx';
import Parent from '../Parent';
import onChangeLocal from './onChange.js';

let Value = ({
	scriptId,
	workspaceId,
	parentId,
	id,
	parentDataTypeId,
	dataTypeId,
	value,
	KeyComponent,
	TypeComponent,
	ValueComponent,
	last,
	onChange,
	onMerge,
}) => {
	const _parentDataTypeId = useSelector((state) => parentDataTypeId ?? (state.jsObject.data[parentId] || {}).data_type_id);
	const _dataTypeId = useSelector((state) => dataTypeId ?? (state.jsObject.data[id] || {}).data_type_id);
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
				scriptId={scriptId}
				workspaceId={workspaceId}
				parentId={parentId}
				parentDataTypeId={_parentDataTypeId}
				id={id}
				dataTypeId={_dataTypeId}
				value={(() => {
					switch (_dataTypeId) {
						case DATA_TYPE_OBJECT.id:
						case DATA_TYPE_ARRAY.id:
							return <Parent
								scriptId={scriptId}
								workspaceId={workspaceId}
								id={id}
								dataTypeId={_dataTypeId}
								last={last}
								KeyComponent={KeyComponent}
								ValueComponent={ValueComponent}
								TypeComponent={TypeComponent}
								onMerge={onMerge} />;
						default:
							return _value;
					}
				})()}
				onChange={_onChange} />
			: <BoxControlWrapper 
				position="relative"
				width="100%"
				minWidth="max-content"
				maxWidth={(parentId === 0 && _parentDataTypeId === DATA_TYPE_ATOMIC.id)
					? 'inherit'
					: 'max-content'}
				data-border_left_radius_0={!(_parentDataTypeId !== DATA_TYPE_ATOMIC.id 
					|| _parentDataTypeId === DATA_TYPE_OBJECT.id
					|| _parentDataTypeId === DATA_TYPE_ARRAY.id)}
				data-border_left_hide={!(_parentDataTypeId !== DATA_TYPE_ATOMIC.id 
					|| _parentDataTypeId === DATA_TYPE_OBJECT.id
					|| _parentDataTypeId === DATA_TYPE_ARRAY.id)}>
				{(() => {
					switch (_dataTypeId) {
						case DATA_TYPE_OBJECT.id:
						case DATA_TYPE_ARRAY.id:
							return <Parent
								scriptId={scriptId}
								workspaceId={workspaceId}
								id={id}
								dataTypeId={_dataTypeId}
								last={last}
								KeyComponent={KeyComponent}
								ValueComponent={ValueComponent}
								TypeComponent={TypeComponent}
								onMerge={onMerge} />;
						case DATA_TYPE_NULL.id:
							return <Typography color="textSecondary">
								<i><b>NULL</b></i>
							</Typography>;
						case DATA_TYPE_NUMBER.id:
							return <Typography color="primary">
								{_value.toString()}
							</Typography>;
						case DATA_TYPE_BOOLEAN.id:
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
		{last || (_dataTypeId === DATA_TYPE_OBJECT.id
			|| _dataTypeId === DATA_TYPE_ARRAY.id)
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
	scriptId: 0,
	workspaceId: 0,
	parentId: 0,
	id: 0,
	onMerge: () => {},
};

export default Value;
