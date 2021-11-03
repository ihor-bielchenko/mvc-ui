import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import dataTypes from 'structures/dataTypes.js';

let OptionFuncType = ({
	scriptId,
	id,
	dataTypeId,
}) => {
	return <React.Fragment>
		<Box
			pt="2px"
			display="flex"
			alignItems="flex-start">
			<Box 
				pl="24px"
				pr="2px">
				<Typography 
					component="div"
					variant="caption"
					style={{
						color: '#FFF',
						whiteSpace: 'nowrap',
					}}>
					Тип:
				</Typography>
			</Box>
			<Box>
				<Typography 
					component="div"
					variant="caption"
					style={{
						color: '#FFF',
						// whiteSpace: 'nowrap',
					}}>
					<b>{dataTypes[dataTypeId].text()}</b>
				</Typography>
			</Box>
		</Box>
	</React.Fragment>;
};

OptionFuncType = React.memo(OptionFuncType);
OptionFuncType.defaultProps = {
	scriptId: 0,
	id: 0,
	dataTypeId: 0,
};

export default OptionFuncType;
