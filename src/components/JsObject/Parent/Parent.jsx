import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Store from 'components/Store';
import MenuSource from 'components/Menu/Source';
import onMenu from 'components/Menu/onMenu.js';
// import onDialog from 'components/Dialog/onDialog.js';
import { FORMAT_ATOMIC } from 'structures/format.js';
import columnTypes, {
	COLUMN_OBJ,
 	COLUMN_ARR,
 	COLUMN_NUMBER,
 	COLUMN_ID,
} from 'structures/columnTypes.js';
import Header from '../Header';
import Item from '../Item';
import onAddItem from './onAddItem.js';

const closures = {
	[COLUMN_OBJ.id]: [ '{', '}' ],
	[COLUMN_ARR.id]: [ '[', ']' ],
};

let Parent = ({ 
	id,
	typeId,
	last,
	KeyComponent,
	ValueComponent,
	TypeComponent,
}) => {
	const blocksLength = useSelector((state) => (state.jsObject.blocks[id] || []).length);
	const _onAddItem = React.useCallback((e) => onAddItem(e, id), [
		id,
	]);
	const _onMenu = React.useCallback((e) => onMenu(id.toString())(e, id), [
		id,
	]);
	const {
		// dbColumns,
		jsObject: {
			blocks,
			data,
		},
	} = Store().getState();
	const allFirstId = id === 0
		? Number((Object.keys(data))[1])
		: 0;

	// console.log('sourceId', id, blocksLength);

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
				last />
			: <React.Fragment>	
				<Box 
					position="relative"
					width="100%">
					{closures[typeId]
						? <React.Fragment>
							<Typography 
								variant="h4"
								color="textSecondary"
								style={{
									display: 'inline-block',
									padding: '0px 18px 0px 0px',
									height: 56,
									lineHeight: '56px',
								}}>
								<b>{closures[typeId][0]}</b>
							</Typography>
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
									KeyComponent={KeyComponent}
									ValueComponent={ValueComponent}
									TypeComponent={TypeComponent} />);
								i++;
							}
							return collector;
						})()}
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
							? <React.Fragment>
								<Box 
									pt={1}
									pl={2}>
									<Button 
										variant="outlined"
										color="primary"
										startIcon={<AddIcon />}
										onClick={_onMenu}>
										Вставить {columnTypes[typeId].text()}
									</Button>
									<MenuSource
										aria={id.toString()}
										typeId={typeId === COLUMN_ID.id
											? COLUMN_NUMBER.id
											: typeId} />
								</Box>
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
				</Box>
			</React.Fragment>}
	</React.Fragment>;
};

Parent = React.memo(Parent);
Parent.defaultProps = {
	id: 0,
	typeId: 0,
};

export default Parent;
