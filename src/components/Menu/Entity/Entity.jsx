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
import onDialog from 'components/Dialog/onDialog.js';
import {
	DIALOG_PROP,
	DIALOG_IF,
	DIALOG_FUNC,
	DIALOG_JSON,
} from 'consts/dialog.js';
import onClose from '../onClose.js';

let Entity = ({ 
	children, 
	aria, 
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

	return <React.Fragment>
		<Menu
			keepMounted
			id={aria}
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={_onClose}>
			<MenuItem onClick={onDialog(DIALOG_PROP, {
				id: 15,
			})}>
				<ListItemAvatar>
					<DescriptionIcon />
				</ListItemAvatar>
				<Typography>
					Параметр
				</Typography>
			</MenuItem>
			<MenuItem onClick={onDialog(DIALOG_IF)}>
				<ListItemAvatar>
					<DoneAllIcon />
				</ListItemAvatar>
				<Typography>
					Условие
				</Typography>
			</MenuItem>
			<MenuItem onClick={onDialog(DIALOG_FUNC)}>
				<ListItemAvatar>
					<AirportShuttleIcon />
				</ListItemAvatar>
				<Typography>
					Функция
				</Typography>
			</MenuItem>
			<MenuItem onClick={onDialog(DIALOG_JSON)}>
				<ListItemAvatar>
					<TextsmsIcon />
				</ListItemAvatar>
				<Typography>
					JSON-ответ
				</Typography>
			</MenuItem>
		</Menu>
	</React.Fragment>;
};

Entity = React.memo(Entity);
Entity.defaultProps = {
	aria: 'menu-entity',
};

export default Entity;
