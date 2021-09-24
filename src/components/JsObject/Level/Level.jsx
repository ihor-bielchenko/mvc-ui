import React from 'react';
import { useSelector } from 'react-redux';
// import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
	COLUMN_OBJ,
 	COLUMN_ARR,
} from 'structures/columnTypes.js';
import Item from '../Item';

const closures = {
	[COLUMN_OBJ.id]: [ '{', '}' ],
	[COLUMN_ARR.id]: [ '[', ']' ],
};
let Level = ({
	parentId, 
	typeId,
	editType,
	editKey,
	editValue,
	editKeyAsDefault,
	editValueAsDefault,
}) => {
	const objectData = useSelector((state) => typeof data === 'function'
		? data()
		: state.jsObject.data);

	let key,
		renderer = [];

	for (key in objectData) {
		const _key = key;

		renderer.push(<Item
			key={_key}
			id={_key}
			parentTypeId={typeId}
			data={() => objectData[_key]}
			editType />);
	}

	return <React.Fragment>
		{closures[typeId]
			? <Typography 
				variant="h4"
				color="textSecondary">
				<b>{closures[typeId][0]}</b>
			</Typography>
			: <React.Fragment />}
		{renderer}
		{closures[typeId]
			? <Typography
				variant="h4"
				color="textSecondary">
				<b>{closures[typeId][1]}</b>
			</Typography>
			: <React.Fragment />}
	</React.Fragment>;
};

Level = React.memo(Level);
Level.defaultProps = {
	parentId: 0,
	typeId: 0,
	editType: false,
	editKey: false,
	editValue: false,
	editKeyAsDefault: false,
	editValueAsDefault: false,
};

export default Level;
