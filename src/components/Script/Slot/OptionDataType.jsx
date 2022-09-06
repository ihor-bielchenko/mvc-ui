import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import dataTypes from 'structures/dataTypes.js';
import { getLang } from 'components/Language';

let OptionDataType = ({
	scriptId,
	id,
	dataTypeId,
}) => {
	return <React.Fragment>
		<Box
			display="flex"
			alignItems="flex-start"
			pl="24px">
			<Typography 
				component="div"
				variant="caption"
				style={{
					color: '#FFF',
					whiteSpace: 'nowrap',
					paddingRight: 2,
				}}>
				{getLang('TypeText888')}:
			</Typography>
			<Typography 
				component="div"
				variant="caption"
				style={{
					color: '#FFF',
					// whiteSpace: 'nowrap',
				}}>
				<b>{dataTypes[dataTypeId]
					? dataTypes[dataTypeId].text()
					: getLang('NotDefinedText888')}</b>
			</Typography>
		</Box>
	</React.Fragment>;
};

OptionDataType = React.memo(OptionDataType);
OptionDataType.defaultProps = {
	scriptId: 0,
	id: 0,
	dataTypeId: 0,
};

export default OptionDataType;
