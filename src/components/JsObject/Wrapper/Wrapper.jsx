import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Store from 'components/Store';
import onMenu from 'components/Menu/onMenu.js';
import Header from '../Header';
import Item from '../Item';
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
let Wrapper = ({ 
	id,
	typeId,
	last,
	disabledWrapper,
	KeyComponent,
	ValueComponent,
	TypeComponent,
}) => {
	const blocksLength = useSelector((state) => (state.jsObject.blocks[id] || []).length);
	const lengthIsUndefined = useSelector((state) => !!state.jsObject.data[id].lengthIsUndefined);
	const disabled = useSelector((state) => typeof disabledWrapper === 'boolean'
		? disabledWrapper
		: !!state.jsObject.data[id].disabled);
	const _onAddItem = React.useCallback((e) => onAddItem(e, id), [
		id,
	]);
	const {
		blocks,
		data,
	} = Store().getState().jsObject;
	const allFirstId = id === 0
		? Number((Object.keys(data))[1])
		: 0;

	// console.log('lengthIsUndefined', id, typeId, lengthIsUndefined);

	return <React.Fragment>
		{id === 0
			? <Header typeId={typeId} />
			: <React.Fragment />}
		{(allFirstId > 0 && typeId === FORMAT_ATOMIC.id)
			? <Item 
				id={allFirstId}
				KeyComponent={KeyComponent}
				ValueComponent={ValueComponent}
				TypeComponent={TypeComponent}
				disabledWrapper={disabled}
				last />
			: <React.Fragment>
				{closures[typeId]
					? <React.Fragment>
						<Typography 
							variant="h4"
							color="textSecondary"
							style={{
								padding: 0,
								height: 56,
								lineHeight: '56px',
							}}>
							<b>{closures[typeId][0]}</b>
						</Typography>
						{lengthIsUndefined
							? <Typography 
								variant="h3"
								color="textSecondary"
								style={{
									lineHeight: '14px',
								}}>
								...
								<Typography 
									component="span"
									variant="caption"
									color="textSecondary"
									style={{
										paddingLeft: 8,
									}}>
									Длина массива не определена
								</Typography>
							</Typography>
							: <React.Fragment />}
					</React.Fragment>
					: <React.Fragment />}
				{(() => {
					let i = 0,
						collector = [];

					while (i < blocksLength) {
						collector.push(<Item
							key={blocks[id][i].id}
							id={blocks[id][i].id}
							parentId={id}
							last={i === blocksLength - 1}
							disabledWrapper={disabled}
							KeyComponent={KeyComponent}
							ValueComponent={ValueComponent}
							TypeComponent={TypeComponent} />);
						i++;
					}
					return collector;
				})()}
				{!disabled
					? <React.Fragment>
						<Box pl={2}>
							<Button 
								variant="outlined"
								color="primary"
								startIcon={<AddIcon />}
								onClick={_onAddItem}>
								Добавить элемент
							</Button>
						</Box>
						{blocksLength === 0
							? <Box 
								pt={1}
								pl={2}>
								<Button 
									variant="outlined"
									color="primary"
									startIcon={<AddIcon />}
									onClick={onMenu(id.toString())}>
									{typeId === COLUMN_OBJ.id
										? 'Вставить объект'
										: typeId === COLUMN_ARR.id
											? 'Вставить массив'
											: ''}
								</Button>
							</Box>
							: <React.Fragment />}
					</React.Fragment>
					: <React.Fragment />}
				{closures[typeId]
					? <React.Fragment>
						{lengthIsUndefined
							? <Typography 
								variant="h3"
								color="textSecondary">
								...
							</Typography>
							: <React.Fragment />}
						<Box display="flex">
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
					</React.Fragment>
					: <React.Fragment />}
			</React.Fragment>}
	</React.Fragment>;
};

Wrapper = React.memo(Wrapper);
Wrapper.defaultProps = {
	id: 0,
	typeId: 0,
};

export default Wrapper;
