import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { 
	DATA_TYPE_OBJECT,
	DATA_TYPE_ARRAY,
	DATA_TYPE_NULL,
	DATA_TYPE_NUMBER,
	DATA_TYPE_BOOLEAN,
} from 'structures/dataTypes.js';

let Values = ({
	dataTypeId, 
	value,
	widthDefault,
	last,
}) => {
	return <React.Fragment>
		{widthDefault 
			? <Typography
				variant="caption"
				color="textSecondary"
				style={{
					paddingLeft: 12,
					paddingRight: 4,
					height: 56,
					lineHeight: '56px',
					minWidth: 108,
				}}>
				По умолучанию:
			</Typography>
			: <React.Fragment />}
		{(() => {
			switch (dataTypeId) {
				case DATA_TYPE_OBJECT.id:
				case DATA_TYPE_ARRAY.id:
					return typeof value === 'function'
						? value()
						: value;
				case DATA_TYPE_NULL.id:
					return <Typography 
						variant="body1"
						color="textSecondary"
						style={{
							height: 56,
							lineHeight: '56px'
						}}>
						<i><b>NULL</b></i>
					</Typography>;
				case DATA_TYPE_NUMBER.id:
					return typeof value === 'function'
						? value()
						: <Typography 
							variant="body1"
							color="primary"
							style={{
								height: 56,
								lineHeight: '56px'
							}}>
							{value.toString()}
						</Typography>;
				case DATA_TYPE_BOOLEAN.id:
					return typeof value === 'function'
						? value()
						: <Typography 
								variant="body1"
								color={value
									? 'primary'
									: 'secondary'}
								style={{
									height: 56,
									lineHeight: '56px'
								}}>
								{value.toString().toUpperCase()}
							</Typography>;
				default:
					return value
						? typeof value === 'function'
							? value()
							: <Typography 
								variant="body1"
								style={{
									height: 56,
									lineHeight: '56px'
								}}>
								{value.toString()}
							</Typography>
						: <Typography
							variant="caption"
							color="textSecondary"
							style={{
								height: 56,
								lineHeight: '56px'
							}}>
							<i>пустая строка</i>
						</Typography>;		
				}
		})()}
		{last || typeof value === 'function'
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

Values = React.memo(Values);
Values.defaultProps = {
	widthDefault: false,
};

export default Values;