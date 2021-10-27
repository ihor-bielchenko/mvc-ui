import React from 'react';
import { useSelector } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import onClose from '../onClose.js';

let Control = ({ 
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
			{typeof onEdit === 'function'
				&& <MenuItem onClick={onEdit}>
					<ListItemAvatar>
						<EditIcon />
					</ListItemAvatar>
					<Typography>
						Редактировать
					</Typography>
				</MenuItem>}
			{typeof onCopy === 'function'
				&& <MenuItem onClick={onCopy}>
					<ListItemAvatar>
						<FileCopyIcon color="primary" />
					</ListItemAvatar>
					<Typography color="primary">
						Копировать
					</Typography>
				</MenuItem>}
			{typeof onDelete === 'function'
				&& <MenuItem onClick={onDelete}>
					<ListItemAvatar>
						<DeleteForeverIcon color="secondary" />
					</ListItemAvatar>
					<Typography color="secondary">
						Удалить
					</Typography>
				</MenuItem>}
			{children}
		</Menu>
	</React.Fragment>;
};

Control = React.memo(Control);
Control.defaultProps = {
	aria: 'menu-control',
};

export default Control;
