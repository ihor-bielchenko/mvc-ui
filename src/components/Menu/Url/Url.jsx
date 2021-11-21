import React from 'react';
import { useSelector } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import onDialog from 'components/Dialog/onDialog.js';
import { 
	DIALOG_URL_VALUE,
	DIALOG_URL_PLACEHOLDER,
} from 'consts/dialog.js';
import onClose from '../onClose.js';

let Url = ({ 
	aria, 
	index,
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
			<MenuItem onClick={onDialog(DIALOG_URL_VALUE, {
				index,
			})}>
				<Typography>
					Путь
				</Typography>
			</MenuItem>
			<MenuItem onClick={onDialog(DIALOG_URL_PLACEHOLDER, {
				index,
			})}>
				<Typography>
					Плэйсхолдер
				</Typography>
			</MenuItem>
		</Menu>
	</React.Fragment>;
};

Url = React.memo(Url);
Url.defaultProps = {
	aria: 'menu-url',
	index: -1,
};

export default Url;
