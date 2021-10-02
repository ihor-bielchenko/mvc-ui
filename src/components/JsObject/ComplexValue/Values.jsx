import React from 'react';
import Typography from '@material-ui/core/Typography';
import { 
	COLUMN_OBJ,
	COLUMN_ARR,
	COLUMN_NULL,
	COLUMN_NUMBER,
	COLUMN_BOOLEAN,
} from 'structures/columnTypes.js';

let Values = ({
	typeId, 
	value,
}) => {
	return <React.Fragment>
		<Typography
			variant="caption"
			color="textSecondary"
			style={{
				paddingLeft: 12,
				paddingRight: 4,
				height: 56,
				lineHeight: '56px',
			}}>
			По умолучанию:
		</Typography>
		{(() => {
			switch (typeId) {
				case COLUMN_OBJ.id:
				case COLUMN_ARR.id:
					return value;
				case COLUMN_NULL.id:
					return <Typography 
						variant="h5"
						color="textSecondary"
						style={{
							height: 56,
							lineHeight: '56px'
						}}>
						<i><b>NULL</b></i>
					</Typography>;
				case COLUMN_NUMBER.id:
					return <Typography 
						variant="h5"
						color="primary"
						style={{
							height: 56,
							lineHeight: '56px'
						}}>
						{value.toString()}
					</Typography>;
				case COLUMN_BOOLEAN.id:
					return <Typography 
						variant="h5"
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
						? <Typography 
							variant="h5"
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
	</React.Fragment>;
};

Values = React.memo(Values);
Values.defaultProps = {
};

export default Values;