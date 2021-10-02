import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import {
	COLUMN_OBJ,
	COLUMN_ARR,
} from 'structures/columnTypes.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import ComplexValue from '../ComplexValue';
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
}) => {
	const parentTypeId = useSelector((state) => (state.jsObject.data[parentId] || {}).type_id);
	const typeId = useSelector((state) => (state.jsObject.data[id] || {}).type_id);
	const value = useSelector((state) => (state.jsObject.data[id] || {}).value);

	return <React.Fragment>
		{typeof value === 'object' 
			&& value.source_id > 0
			&& (typeId === COLUMN_OBJ.id || typeId === COLUMN_ARR.id)
			? <ComplexValue 
				parentId={parentId}
				id={id}
				last={last}
				KeyComponent={KeyComponent}
				ValueComponent={ValueComponent}
				TypeComponent={TypeComponent} />
			: <Box
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
			</Box>}
	</React.Fragment>;
};

Item = React.memo(Item);
Item.defaultProps = {
	id: 0,
	parentId: 0,
	last: false,
};

export default Item;
