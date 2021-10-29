import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuControl from 'components/Menu/Control';
import onMenu from 'components/Menu/onMenu.js';
import onDialog from 'components/Dialog/onDialog.js';
import onLoader from 'components/Loader/onLoader.js';
import dataTypes from 'structures/dataTypes.js';
import { 
	DIALOG_DELETE_CONFIRM,
	DIALOG_PROP, 
} from 'consts/dialog.js';

const _onHandler = (dialogId, props) => (e) => {
	onLoader(true);
	onDialog(dialogId, props)(e)
};
let Slot = ({
	id,
	entityId,
	dialogId,
	dataTypeId,
	withControl,
	backgroundColor,
	children,
	onDelete,
}) => {
	return <React.Fragment>
			<Box 
				position="relative"
				display="flex"
				alignItems="flex-start"
				width="196px"
				minHeight="54px"
				maxHeight="120px"
				mx="auto"
				py="42px">
				<Box
					position="relative"
					overflow="hidden"
					width="166px"
					minHeight="54px"
					maxHeight="120px"
					border="3px solid #78909C"
					style={{
						backgroundColor,
					}}>
					{children}
					{dataTypeId >= -1
						? <Box
							pt="2px"
							display="flex"
							alignItems="flex-start">
							<Box 
								pl="24px"
								pr="2px">
								<Typography 
									component="div"
									variant="caption"
									style={{
										color: '#FFF',
										whiteSpace: 'nowrap',
									}}>
									Тип:
								</Typography>
								{/*<Typography 
									component="div"
									variant="caption"
									style={{
										color: '#FFF',
										whiteSpace: 'nowrap',
									}}>
									Зависимости:
								</Typography>*/}
							</Box>
							<Box>
								<Typography 
									component="div"
									variant="caption"
									style={{
										color: '#FFF',
										// whiteSpace: 'nowrap',
									}}>
									<b>{dataTypes[dataTypeId].text()}</b>
								</Typography>
								{/*<Typography 
									component="div"
									variant="caption"
									style={{
										color: '#FFF',
										whiteSpace: 'nowrap',
									}}>
									<b>0</b>
								</Typography>*/}
							</Box>
						</Box>
						: <React.Fragment />}
				</Box>
				{withControl
					? <React.Fragment>
						<IconButton 
							size="small"
							onClick={onMenu('menu-slot-'+ entityId)}>
							<MoreVertIcon />
						</IconButton>
						<MenuControl
							aria={'menu-slot-'+ entityId}
							onEdit={_onHandler(dialogId, {
								id,
								// fromEntityId,
								// fromArrowTypeId,
							})}
							onDelete={onDialog(DIALOG_DELETE_CONFIRM, {
								onDelete,
							})} />
					</React.Fragment>
					: <Box width="30px" />}
			</Box>
	</React.Fragment>;
};

Slot = React.memo(Slot);
Slot.defaultProps = {
	id: 0,
	entityId: 0,
	dialogId: DIALOG_PROP,
	withControl: false,
	backgroundColor: 'inherit',
	onDelete: () => {},
};

export default Slot;
