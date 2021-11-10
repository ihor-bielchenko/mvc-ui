import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuControl from 'components/Menu/Control';
import onMenu from 'components/Menu/onMenu.js';
import onDialog from 'components/Dialog/onDialog.js';
import onLoader from 'components/Loader/onLoader.js';
import { onClick } from 'components/Menu/Entity';
import { 
	DIALOG_DELETE_CONFIRM,
	DIALOG_PROP, 
} from 'consts/dialog.js';

const _onHandler = (dialogId, workspaceId, index, props) => (e) => {
	onLoader(true);

	onClick(dialogId, workspaceId, index, props)(e);
};
let Slot = ({
	scriptId,
	workspaceId,
	id,
	entityId,
	index,
	dialogId,
	dataTypeId,
	isSource,
	withControl,
	backgroundColor,
	children,
	dataTypeValidating,
	onDelete,
	onClick,
}) => {
	const editEntityIndex = useSelector((state) => state.script.editEntityIndex);
	const formPropEntityId = useSelector((state) => (state.prop || {}).entityId);
	const formJsonEntityId = useSelector((state) => (state.json || {}).entityId);
	const formFuncEntityId = useSelector((state) => (state.func || {}).entityId);
	const _dataTypeValidating = dataTypeValidating();
	const _dataTypeValidatingFlag = _dataTypeValidating.includes(dataTypeId);
	const _formIdMatchEntityFlag = formPropEntityId === entityId 
		|| formJsonEntityId === entityId
		|| formFuncEntityId === entityId;
	const isDisabled = (isSource && !_dataTypeValidatingFlag) 
		|| _formIdMatchEntityFlag
		|| editEntityIndex < index;

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
					{ ...isDisabled
						? {
							style: {
								backgroundColor: '#BDBDBD',
							},
						}
						: {
							...isSource
								? { onClick }
								: {},
							style: {
								backgroundColor,
								cursor: 'pointer',
							}
						} }>
					<Box 
						id={'to-'+ workspaceId +'-'+ entityId}
						position="absolute"
						top='-3px'
						left="50%"
						width="0px"
						height="0px" />
					{children}
					<Box 
						id={'false-'+ workspaceId +'-'+ entityId}
						position="absolute"
						top="36px"
						left="-3px"
						width="0px"
						height="0px" />
					<Box 
						id={'true-'+ workspaceId +'-'+ entityId}
						position="absolute"
						top="36px"
						right="-3px"
						width="0px"
						height="0px" />
					<Box 
						id={'default-'+ workspaceId +'-'+ entityId}
						bottom="-3px"
						position="absolute"
						left="50%"
						width="0px"
						height="0px" />
				</Box>
				{!isSource && withControl
					? <React.Fragment>
						<IconButton 
							size="small"
							onClick={onMenu('menu-slot-'+ entityId)}>
							<MoreVertIcon />
						</IconButton>
						<MenuControl
							aria={'menu-slot-'+ entityId}
							onEdit={_onHandler(dialogId, workspaceId, index, {
								id,
								scriptId,
								workspaceId,
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
	workspaceId: 0,
	id: 0,
	entityId: 0,
	index: 0,
	dialogId: DIALOG_PROP,
	withControl: false,
	isSource: false,
	backgroundColor: 'inherit',
	dataTypeValidating: () => ([]),
	onDelete: () => {},
	onClick: () => {},
};

export default Slot;
