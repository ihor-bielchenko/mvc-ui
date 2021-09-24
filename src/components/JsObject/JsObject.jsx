import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Header from './Header';
import Item from './Item';
import onAddItem from './onAddItem.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import {
	COLUMN_OBJ,
 	COLUMN_ARR,
} from 'structures/columnTypes.js';

const closures = {
	[COLUMN_OBJ.id]: [ '{', '}' ],
	[COLUMN_ARR.id]: [ '[', ']' ],
};
let JsObject = ({ 
	parentId,
	typeId,
	data, 
	editType,
	editKey,
	editValue,
	editKeyAsDefault,
	editValueAsDefault,
	last,
	MenuKeyComponent,
	MenuValueComponent,
}) => {
	const _data = useSelector((state) => typeof data === 'function'
		? data()
		: state.jsObject.data);
	const _onAddItem = React.useCallback((e) => onAddItem(e, parentId), [
		parentId,
	]);
	const dataKeys = Object.keys(_data);
	const renderer = [];

	dataKeys.forEach((id, index) => {
		renderer.push(<Item
			key={id}
			id={id}
			parentTypeId={(typeof data === 'undefined' 
				&& typeId === FORMAT_ATOMIC.id)
				? undefined
				: typeId}
			data={() => _data[id]}
			last={(index === dataKeys.length - 1)}
			editType
			MenuKeyComponent={MenuKeyComponent}
			MenuValueComponent={MenuValueComponent} />);
	});

	return <React.Fragment>
		{typeof data === 'undefined'
			? <Header typeId={typeId} />
			: <React.Fragment />}
		{(typeof data === 'undefined' 
			&& typeId === FORMAT_ATOMIC.id)
			? <Item 
				id={dataKeys[0]}
				data={() => _data[dataKeys[0]]}
				MenuKeyComponent={MenuKeyComponent}
				MenuValueComponent={MenuValueComponent}
				last
				editType />
			: <React.Fragment>
				{closures[typeId]
					? <Typography 
						variant="h4"
						color="textSecondary"
						style={{
							padding: 0,
							height: 56,
							lineHeight: '56px',
						}}>
						<b>{closures[typeId][0]}</b>
					</Typography>
					: <React.Fragment />}
				{renderer}
				<Box pl={2}>
					<Button 
						variant="outlined"
						color="primary"
						startIcon={<AddIcon />}
						onClick={_onAddItem}>
						Добавить элемент
					</Button>
				</Box>
				{closures[typeId]
					? <Box display="flex">
						<Typography
							variant="h4"
							color="textSecondary"
							style={{
								padding: 0,
								height: 56,
								lineHeight: '56px',
							}}>
							<b>{closures[typeId][1]}</b>
						</Typography>
						{(typeof last === 'boolean' && !last)
							? <Box 
								position="relative"
								textAlign="center"
								minWidth="8px"
								maxWidth="8px"
								pt="12px">
								<Typography variant="h5">
									,
								</Typography>
							</Box>
							: <React.Fragment />}
					</Box>
					: <React.Fragment />}
			</React.Fragment>}
	</React.Fragment>;
};

JsObject = React.memo(JsObject);
JsObject.defaultProps = {
	typeId: 0,
	editType: false,
	editKey: false,
	editValue: false,
	editKeyAsDefault: false,
	editValueAsDefault: false,
};

export default JsObject;
