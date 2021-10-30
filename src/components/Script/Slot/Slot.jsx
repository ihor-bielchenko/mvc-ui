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
	scriptId,
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
				mx="auto">
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
					<Box 
						id={'to-'+ scriptId +'-'+ entityId}
						position="absolute"
						top='-3px'
						left="50%"
						width="0px"
						height="0px" />
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
					<Box 
						id={'false-'+ scriptId +'-'+ entityId}
						position="absolute"
						top="36px"
						left="-3px"
						width="0px"
						height="0px" />
					<Box 
						id={'true-'+ scriptId +'-'+ entityId}
						position="absolute"
						top="36px"
						right="-3px"
						width="0px"
						height="0px" />
					<Box 
						id={'default-'+ scriptId +'-'+ entityId}
						bottom="-3px"
						position="absolute"
						left="50%"
						width="0px"
						height="0px" />
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
	scriptId: 0,
	id: 0,
	entityId: 0,
	dialogId: DIALOG_PROP,
	withControl: false,
	backgroundColor: 'inherit',
	onDelete: () => {},
};

export default Slot;
