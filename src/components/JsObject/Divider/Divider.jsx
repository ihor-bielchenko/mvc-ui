import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {
	COLUMN_OBJ,
	COLUMN_ARR,
} from 'structures/columnTypes.js';
import { FORMAT_ATOMIC } from 'structures/format.js';

let Divider = ({
	parentId,
	id,
}) => {
	const parentTypeId = useSelector((state) => (state.jsObject.data[parentId] || {}).type_id);
	
	return parentTypeId !== FORMAT_ATOMIC.id 
		|| parentTypeId === COLUMN_OBJ.id
		|| parentTypeId === COLUMN_ARR.id
		? <Typography	
			variant="h4"
			style={{
				position: 'relative',
				overflow: 'hidden',
				minWidth: 8,
				height: 56,
				paddingLeft: 3,
				paddingRight: 9,
				lineHeight: '56px',
				textAlign: 'center'
			}}>
			:
		</Typography>
		: <React.Fragment />
};

Divider = React.memo(Divider);
Divider.defaultProps = {
	parentId: 0,
	id: 0,
};

export default Divider;
