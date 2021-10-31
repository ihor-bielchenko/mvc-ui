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
import dataTypes, {
	DATA_TYPE_ATOMIC,
	DATA_TYPE_OBJECT,
 	DATA_TYPE_ARRAY,
 	DATA_TYPE_NUMBER,
 	DATA_TYPE_ID,
} from 'structures/dataTypes.js';
import sourceTypes, {
	SOURCE_TYPE_DB,
	SOURCE_TYPE_PROXY_PASS,
} from 'structures/sourceTypes.js';
import Header from '../Header';
import Item from '../Item';
import onAddItem from './onAddItem.js';

const closures = {
	[DATA_TYPE_OBJECT.id]: [ '{', '}' ],
	[DATA_TYPE_ARRAY.id]: [ '[', ']' ],
};
const _onFilterMenuSource = (dataTypeId) => (key, i) => {
	return dataTypeId === DATA_TYPE_OBJECT.id
		? (sourceTypes[key].id === SOURCE_TYPE_DB.id
			|| sourceTypes[key].id === SOURCE_TYPE_PROXY_PASS.id)
		: (dataTypeId === DATA_TYPE_ARRAY.id)
			? (sourceTypes[key].id === SOURCE_TYPE_DB.id)
			: false;
};

let Parent = ({ 
	id,
	dataTypeId,
	last,
	KeyComponent,
	ValueComponent,
	TypeComponent,
}) => {
	const blocksLength = useSelector((state) => (state.jsObject.blocks[id] || []).length);
	const _onAddItem = React.useCallback((e) => onAddItem(e, id), [
		id,
	]);
	const _onMenu = React.useCallback((e) => onMenu(id.toString(), dataTypeId === DATA_TYPE_ARRAY.id
		? ({ isCollection: true })
		: ({ isCollection: false }))(e, id), [
		id,
		dataTypeId,
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

	return <React.Fragment>
		{id === 0
			? <Header dataTypeId={dataTypeId} />
			: <React.Fragment />}
		{(allFirstId > 0 && dataTypeId === DATA_TYPE_ATOMIC.id)
			? <React.Fragment>
				<Item 
					id={allFirstId}
					KeyComponent={KeyComponent}
					ValueComponent={ValueComponent}
					TypeComponent={TypeComponent}
					last />
			</React.Fragment>
			: <React.Fragment>	
				<Box 
					position="relative"
					width="100%">
					{closures[dataTypeId]
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
								<b>{closures[dataTypeId][0]}</b>
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
						{closures[dataTypeId]
							? <React.Fragment>
								<Box 
									pt={1}
									pl={2}>
									<Button 
										variant="outlined"
										color="primary"
										startIcon={<AddIcon />}
										onClick={_onMenu}>
										Вставить {dataTypes[dataTypeId].text()}
									</Button>
									<MenuSource
										aria={id.toString()}
										dataTypeId={dataTypeId === DATA_TYPE_ID.id
											? DATA_TYPE_NUMBER.id
											: dataTypeId}
										onFilter={_onFilterMenuSource(dataTypeId)} />
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
										<b>{closures[dataTypeId][1]}</b>
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
	dataTypeId: 0,
};

export default Parent;
