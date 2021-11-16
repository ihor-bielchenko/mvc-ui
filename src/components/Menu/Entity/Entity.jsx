import React from 'react';
import { useSelector } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import TextsmsIcon from '@material-ui/icons/Textsms';
import LoopIcon from '@material-ui/icons/Loop';
import Store from 'components/Store';
import onDialog from 'components/Dialog/onDialog.js';
import {
	DIALOG_PROP,
	DIALOG_IF,
	DIALOG_FUNC,
	DIALOG_JSON,
} from 'consts/dialog.js';
import onClose from '../onClose.js';

export const onClick = (dialogId, workspaceId, props) => (e) => {
	const script = Store().getState().script;

	script[workspaceId].loadedFlag = false;
	Store().dispatch({
		type: 'script',
		payload: () => ({ ...script }),
	});
	onDialog(dialogId, props)(e);
};
let Entity = ({ 
	children, 
	aria, 
	scriptId,
	workspaceId,
	fromEntityId,
	fromArrowTypeId,
	onEdit,
	onCopy,
	onDelete,
}) => {
	const anchorEl = useSelector((state) => state.menu[aria]
		? state.menu[aria].anchorEl
		: null);
	const _onClose = React.useCallback((e) => onClose(e, aria), [
		aria,
	]);
	// fromArrowTypeId = process.env.ARROW_TYPE_TRUE;

	return <React.Fragment>
		<Menu
			keepMounted
			id={aria}
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={_onClose}>
			<MenuItem onClick={onClick(DIALOG_PROP, workspaceId, {
				scriptId,
				workspaceId,
				fromEntityId,
				fromArrowTypeId,
			})}>
				<ListItemAvatar>
					<DescriptionIcon />
				</ListItemAvatar>
				<Typography>
					Параметр
				</Typography>
			</MenuItem>
			<MenuItem onClick={onClick(DIALOG_IF, workspaceId, {
				scriptId,
				workspaceId,
				fromEntityId,
				fromArrowTypeId,
			})}>
				<ListItemAvatar>
					<DoneAllIcon />
				</ListItemAvatar>
				<Typography>
					Условие
				</Typography>
			</MenuItem>
			<MenuItem onClick={onClick(DIALOG_FUNC, workspaceId, {
				scriptId,
				workspaceId,
				fromEntityId,
				fromArrowTypeId,
			})}>
				<ListItemAvatar>
					<AirportShuttleIcon />
				</ListItemAvatar>
				<Typography>
					Функция
				</Typography>
			</MenuItem>
			<MenuItem onClick={onClick(DIALOG_JSON, workspaceId, {
				scriptId,
				workspaceId,
				fromEntityId,
				fromArrowTypeId,
			})}>
				<ListItemAvatar>
					<TextsmsIcon />
				</ListItemAvatar>
				<Typography>
					JSON-ответ
				</Typography>
			</MenuItem>
			<MenuItem disabled>
				<ListItemAvatar>
					<LoopIcon />
				</ListItemAvatar>
				<Typography>
					Цикл
				</Typography>
			</MenuItem>
		</Menu>
	</React.Fragment>;
};

Entity = React.memo(Entity);
Entity.defaultProps = {
	aria: 'menu-entity',
	scriptId: 0,
	fromEntityId: 0,
	fromArrowTypeId: 0,
};

export default Entity;
