import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
	COLUMN_OBJ,
 	COLUMN_ARR,
} from 'structures/columnTypes.js';

let Header = ({ typeId }) => {
	return <Box
		position="relative"
		display="flex"
		alignItems="flex-start"
		width="100%"
		pl={(typeId === COLUMN_OBJ.id || typeId === COLUMN_ARR.id)
			? 2
			: 0}>
		{(typeId === COLUMN_OBJ.id || typeId === COLUMN_ARR.id)
			? <Typography
				component="div"
				variant="caption"
				color="textSecondary"
				style={{
					minWidth: typeId === COLUMN_ARR.id
						? '46px'
						: '138px',
					maxWidth: typeId === COLUMN_ARR.id
						? '46px'
						: '138px',
					textAlign: typeId === COLUMN_ARR.id
						? 'right'
						: 'center',
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
