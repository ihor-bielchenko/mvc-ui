import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import {
	DATA_TYPE_ATOMIC,
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
} from 'structures/dataTypes.js';

let Divider = ({
	parentId,
	id,
}) => {
	const parentDataTypeId = useSelector((state) => (state.jsObject.data[parentId] || {}).data_type_id);
	
	return parentDataTypeId !== DATA_TYPE_ATOMIC.id 
		|| parentDataTypeId === DATA_TYPE_OBJECT.id
		|| parentDataTypeId === DATA_TYPE_ARRAY.id
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
