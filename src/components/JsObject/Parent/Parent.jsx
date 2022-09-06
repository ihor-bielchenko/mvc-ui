import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Store from 'components/Store';
// import onDialog from 'components/Dialog/onDialog.js';
import {
	DATA_TYPE_ATOMIC,
	DATA_TYPE_OBJECT,
 	DATA_TYPE_ARRAY,
} from 'structures/dataTypes.js';
import { SOURCE_TYPE_DB } from 'structures/sourceTypes.js';
import Header from '../Header';
import Item from '../Item';
import onAddItem from './onAddItem.js';
import { getLang } from 'components/Language';

const closures = {
	[DATA_TYPE_OBJECT.id]: [ '{', '}' ],
	[DATA_TYPE_ARRAY.id]: [ '[', ']' ],
};

let Parent = ({ 
	scriptId,
	workspaceId,
	id,
	dataTypeId,
	last,
	KeyComponent,
	ValueComponent,
	TypeComponent,
	MergeComponent,
	onMenuComplexValue,
	hideComplexType,
}) => {
	const sourceTypeId = useSelector((state) => ((state.jsObject.data[id] || {}).collection || {}).source_type_id);
	const blocksLength = useSelector((state) => (state.jsObject.blocks[id] || []).length);
	const _onAddItem = React.useCallback((e) => onAddItem(e, id), [
		id,
	]);
	const {
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
					MergeComponent={MergeComponent}
					onMenuComplexValue={onMenuComplexValue}
					last />
			</React.Fragment>
			: <React.Fragment>	
				<Box 
					position="relative"
					width="100%">
					{!hideComplexType && closures[dataTypeId]
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
									scriptId={scriptId}
									workspaceId={workspaceId}
									id={blocks[id][i].id}
									parentId={id}
									last={i === blocksLength - 1}
									KeyComponent={KeyComponent}
									ValueComponent={ValueComponent}
									TypeComponent={TypeComponent}
									MergeComponent={MergeComponent}
									onMenuComplexValue={onMenuComplexValue} />);
								i++;
							}
							return collector;
						})()}
						{!hideComplexType
							&& sourceTypeId !== SOURCE_TYPE_DB.id
							? <Box pl={2}>
								<Button 
									variant="outlined"
									color="primary"
									startIcon={<AddIcon />}
									onClick={_onAddItem}>
									{getLang('CreateElement999')}
								</Button>
							</Box>
							: <React.Fragment />}
						{!hideComplexType 
							&& closures[dataTypeId]
							&& sourceTypeId !== SOURCE_TYPE_DB.id
							? <React.Fragment>
								<Box 
									pt={1}
									pl={2}>
									{(typeof MergeComponent === 'object'
										&& typeof MergeComponent['$$typeof'] === 'symbol')
										? <MergeComponent
											scriptId={scriptId}
											workspaceId={workspaceId}
											id={id}
											dataTypeId={dataTypeId} />
										: <React.Fragment />}
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
	scriptId: 0,
	workspaceId: 0,
	id: 0,
	dataTypeId: 0,
	onMenuComplexValue: () => {},
	hideComplexType: false,
};

export default Parent;
