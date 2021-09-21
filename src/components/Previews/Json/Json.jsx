import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import jsonFormat from 'structures/jsonFormat.js';
import Entity from '../Entity';

let Json = ({ 
	scriptRenderId,
	id,
	isSource,
	onClickEntity,
	formatValidating,
}) => {
	const nameSubstr = useSelector((state) => state
		.entities
		.data[id]
		.name
		.substr(0, 45));
	const statusId = useSelector((state) => state
		.entities
		.data[id]
		.status_id);
	const formatId = useSelector((state) => state
		.entities
		.data[id]
		.format_id);
	const format = jsonFormat[formatId];

	return <Entity 
		scriptRenderId={scriptRenderId}
		id={id}
		isSource={isSource}
		onClickEntity={onClickEntity}
		formatValidating={formatValidating}
		StartIcon={VerticalSplitIcon}
		color="#FFF"
		backgroundColor="#616161">
		<Typography
			variant="caption"
			component="div"
			style={{ lineHeight: '16px' }}>
			Json-ответ
		</Typography>
		<Box py="4px">
			<Typography>
				<b>{statusId}</b> - {(nameSubstr.length >= 44 && nameSubstr[44] !== ' ')
					? <React.Fragment>
						{nameSubstr} <b>...</b>
					</React.Fragment>
					: nameSubstr}
			</Typography>
		</Box>
		<Typography 
			variant="body2"
			component="div">
			{formatId === 2
				? <b>{`{... ${format.text()} ...}`}</b>
				: formatId === 3
					? <b>[... {format.text()} ...]</b>
					: format.text()}
		</Typography>
	</Entity>;
};

Json = React.memo(Json);
Json.defaultJsons = {
	scriptRenderId: 0,
	id: 0,
	isSource: false,
	formatValidating: () => ([]),
};

export default Json;
