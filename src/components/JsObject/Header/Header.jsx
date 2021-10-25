import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
	DATA_TYPE_OBJECT,
 	DATA_TYPE_ARRAY,
} from 'structures/dataTypes.js';

let Header = ({ dataTypeId }) => {
	return <Box
		position="relative"
		display="flex"
		alignItems="flex-start"
		width="100%"
		pl={(dataTypeId === DATA_TYPE_OBJECT.id || dataTypeId === DATA_TYPE_ARRAY.id)
			? 2
			: 0}>
		{(dataTypeId === DATA_TYPE_OBJECT.id || dataTypeId === DATA_TYPE_ARRAY.id)
			? <Typography
				component="div"
				variant="caption"
				color="textSecondary"
				style={{
					minWidth: 138,
					maxWidth: 138,
					textAlign: 'center',
				}}>
				Ключ
			</Typography>
			: <React.Fragment />}
		<Typography
			component="div"
			variant="caption"
			color="textSecondary"
			style={{
				width: '14%',
				textAlign: 'center',
			}}>
			Тип
		</Typography>
		<Typography
			component="div"
			variant="caption"
			color="textSecondary"
			style={{
				width: '100%',
				textAlign: 'center',
			}}>
			Значение
		</Typography>
	</Box>;
};

Header = React.memo(Header);
Header.defaultProps = {
};

export default Header;
