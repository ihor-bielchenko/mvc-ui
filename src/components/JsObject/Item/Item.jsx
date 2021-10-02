import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
	COLUMN_OBJ,
	COLUMN_ARR,
} from 'structures/columnTypes.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import { SOURCE_DB } from 'structures/source.js';
import ComplexValue from '../ComplexValue';
import ComplexChip from '../ComplexChip';
import Remove from '../Remove';
import Key from '../Key';
import Type from '../Type';
import Divider from '../Divider';
import Value from '../Value';

let Item = ({
	id,
	parentId,
	last,
	KeyComponent,
	ValueComponent,
	TypeComponent,
	className,
}) => {
	const parentTypeId = useSelector((state) => (state.jsObject.data[parentId] || {}).type_id);
	const typeId = useSelector((state) => (state.jsObject.data[id] || {}).type_id);
	const key = useSelector((state) => (state.jsObject.data[id] || {}).key);
	const value = useSelector((state) => (state.jsObject.data[id] || {}).value);
	const collection = useSelector((state) => (state.jsObject.data[id] || {}).collection);
	const isCollection = useSelector((state) => ((state.jsObject.data[id] || {}).value || {}).is_collection);
	const arrayLengthIsUndefined = (parentTypeId === COLUMN_ARR.id
		&& !key.includes('n+') && key.includes('n')
		&& typeof collection === 'object'
		&& collection.source_id === SOURCE_DB.id
		&& collection.is_collection);
	const isCompexValue = typeof value === 'object' 
		&& value.source_id > 0
		&& (typeId === COLUMN_OBJ.id || typeId === COLUMN_ARR.id);

	console.log('id', id, key);

	return <React.Fragment>
		{arrayLengthIsUndefined
			? <React.Fragment>
				<Typography 
					component="span"
					variant="h3"
					style={{
						lineHeight: '18px',
						paddingLeft: 8,
						paddingRight: 8,
					}}>
					...
				</Typography>
				<Typography
					component="span"
					variant="caption"
					color="secondary">
					Длина массива неизвестна {collection.limit > 0
						? `(макс. ${collection.limit} элементов)`
						: ''}
				</Typography>
			</React.Fragment>
			: <React.Fragment />}
		<Box 
			maxWidth={parentTypeId === FORMAT_ATOMIC.id
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
					parentId={parentId}
					id={id}
					last={last}
					KeyComponent={KeyComponent}
					ValueComponent={ValueComponent}
					TypeComponent={TypeComponent} />
				: <React.Fragment>
					{arrayLengthIsUndefined
						? <ComplexChip id={id} />
						: <React.Fragment />}
					<Box
						position="relative"
						display="flex"
						alignItems="flex-start"
						width="100%"
						pb={1}>
						{parentTypeId !== FORMAT_ATOMIC.id 
							|| parentTypeId === COLUMN_OBJ.id
							|| parentTypeId === COLUMN_ARR.id
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
							parentId={parentId}
							id={id}
							last={last}
							KeyComponent={KeyComponent}
							ValueComponent={ValueComponent}
							TypeComponent={TypeComponent} />
					</Box>
				</React.Fragment>}
		</Box>
		{arrayLengthIsUndefined
			? <Typography 
				component="span"
				variant="h3"
				style={{
					lineHeight: '18px',
					paddingLeft: 8,
					paddingRight: 8,
				}}>
				...
			</Typography>
			: <React.Fragment />}
	</React.Fragment>;
};

Item = React.memo(Item);
Item.defaultProps = {
	id: 0,
	parentId: 0,
	last: false,
};

export default Item;
