import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
	DATA_TYPE_ATOMIC,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
} from 'structures/dataTypes.js';
import { SOURCE_TYPE_DB } from 'structures/sourceTypes.js';
import ComplexValue from '../ComplexValue';
import ComplexChip from '../ComplexChip';
import Remove from '../Remove';
import Key from '../Key';
import Type from '../Type';
import Divider from '../Divider';
import Value from '../Value';
import { getLang } from 'components/Language';

let Item = ({
	scriptId,
	workspaceId,
	id,
	parentId,
	last,
	KeyComponent,
	ValueComponent,
	TypeComponent,
	MergeComponent,
	className,
	onMerge,
	onMenuComplexValue,
}) => {
	const parentDataTypeId = useSelector((state) => (state.jsObject.data[parentId] || {}).data_type_id);
	const dataTypeId = useSelector((state) => (state.jsObject.data[id] || {}).data_type_id);
	const key = useSelector((state) => (state.jsObject.data[id] || {}).key);
	const value = useSelector((state) => (state.jsObject.data[id] || {}).value);
	const collection = useSelector((state) => (state.jsObject.data[id] || {}).collection);
	const isCollection = useSelector((state) => ((state.jsObject.data[id] || {}).value || {}).is_collection);
	const arrayLengthIsUndefined = (parentDataTypeId === DATA_TYPE_ARRAY.id
		&& !key.includes('n+') 
		&& key.includes('n')
		&& typeof collection === 'object'
		&& collection.source_type_id === SOURCE_TYPE_DB.id
		&& collection.is_collection);
	const isCompexValue = (dataTypeId === DATA_TYPE_OBJECT.id || dataTypeId === DATA_TYPE_ARRAY.id)
		&& typeof value === 'object' 
		&& value.source_type_id > 0;

	return <React.Fragment>
		{arrayLengthIsUndefined
			? <React.Fragment>
				<Typography 
					component="span"
					variant="h3"
					style={{
						lineHeight: '0px',
						padding: 8,
					}}>
					...
				</Typography>
				{key[0] === 'n'
					? <Typography
						component="span"
						variant="caption"
						color="secondary">
						{getLang('UndefinedArrayLengthText')} {collection.limit > 0
							? `(max. ${collection.limit} ${getLang('ElementsText999')})`
							: ''}
					</Typography>
					: <React.Fragment />}
			</React.Fragment>
			: <React.Fragment />}
		<Box 
			maxWidth={parentDataTypeId === DATA_TYPE_ATOMIC.id
				? 'inherit'
				: 'max-content'}
			mb="8px"
			style={(isCompexValue && !isCollection) || arrayLengthIsUndefined
				? {
					borderRadius: '16px',
					border: '1px solid #ff9800',
					borderStyle: 'dashed',
				}
				: {}}>
			{isCompexValue
				? <ComplexValue 
					scriptId={scriptId}
					workspaceId={workspaceId}
					parentId={parentId}
					id={id}
					last={last}
					KeyComponent={KeyComponent}
					ValueComponent={ValueComponent}
					TypeComponent={TypeComponent}
					MergeComponent={MergeComponent}
					onMenuComplexValue={onMenuComplexValue} />
				: <React.Fragment>
					{arrayLengthIsUndefined
						? <ComplexChip 
							scriptId={scriptId}
							workspaceId={workspaceId}
							id={id}
							onMenuComplexValue={onMenuComplexValue} />
						: <React.Fragment />}
					<Box
						position="relative"
						display="flex"
						alignItems="flex-start"
						width="100%"
						pb={1}>
						{parentDataTypeId !== DATA_TYPE_ATOMIC.id 
							|| parentDataTypeId === DATA_TYPE_OBJECT.id
							|| parentDataTypeId === DATA_TYPE_ARRAY.id
							? <React.Fragment>
								<Remove
									parentId={parentId}
									id={id} />
								<Key
									parentId={parentId}
									id={id}
									KeyComponent={KeyComponent} />
							</React.Fragment>
							: <React.Fragment />}
						<Type
							parentId={parentId}
							id={id}
							TypeComponent={TypeComponent} />
						<Divider
							parentId={parentId}
							id={id} />
						<Value
							scriptId={scriptId}
							workspaceId={workspaceId}
							parentId={parentId}
							id={id}
							last={last}
							KeyComponent={KeyComponent}
							ValueComponent={ValueComponent}
							TypeComponent={TypeComponent}
							MergeComponent={MergeComponent}
							onMerge={onMerge}
							onMenuComplexValue={onMenuComplexValue} />
					</Box>
				</React.Fragment>}
		</Box>
		{arrayLengthIsUndefined
			? <Typography 
				variant="h3"
				style={{
					lineHeight: '0px',
					padding: 8,
				}}>
				···
			</Typography>
			: <React.Fragment />}
	</React.Fragment>;
};

Item = React.memo(Item);
Item.defaultProps = {
	scriptId: 0,
	workspaceId: 0,
	id: 0,
	parentId: 0,
	last: false,
	onMerge: () => {},
	onMenuComplexValue: () => {},
};

export default Item;
