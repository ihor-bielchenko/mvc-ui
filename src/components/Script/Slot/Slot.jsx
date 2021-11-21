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
	DIALOG_JSON,
	DIALOG_IF,
	DIALOG_FUNC,   
} from 'consts/dialog.js';
import onlyParentTreeValidate from './onlyParentTreeValidate.js';

const _onHandler = (dialogId, workspaceId, props) => async (e) => {
	onLoader(true);
	await onClick(dialogId, workspaceId, props)(e);
	onLoader(false);
};
let Slot = ({
	scriptId,
	workspaceId,
	id,
	entityId,
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
	const dialog = useSelector((state) => state.dialogs[DIALOG_PROP]
		|| state.dialogs[DIALOG_JSON]
		|| state.dialogs[DIALOG_IF]
		|| state.dialogs[DIALOG_FUNC]);
	const fromEntityIdDialog = (dialog || {}).fromEntityId ?? 0;
	const fromEntityIdStore = useSelector((state) => (state.prop || {}).entityId
		|| (state.json || {}).entityId
		|| (state.func || {}).entityId);
	const treeValidateIds = onlyParentTreeValidate((fromEntityIdStore || fromEntityIdDialog), workspaceId);
	const isDisabled = fromEntityIdDialog > 0
		&& ((!dataTypeId
			|| ((isSource && !dataTypeValidating().includes(dataTypeId)) 
			|| (fromEntityIdStore === entityId)))
		|| (!(!fromEntityIdStore && fromEntityIdDialog > 0
			? ([ ...treeValidateIds, fromEntityIdDialog ]).includes(entityId)
			: treeValidateIds.includes(entityId))));

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
							onEdit={_onHandler(dialogId, workspaceId, {
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
	dialogId: DIALOG_PROP,
	withControl: false,
	isSource: false,
	backgroundColor: 'inherit',
	dataTypeValidating: () => ([]),
	onDelete: () => {},
	onClick: () => {},
};

export default Slot;
