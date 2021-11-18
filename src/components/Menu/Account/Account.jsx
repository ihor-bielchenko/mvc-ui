import React from 'react';
import { useSelector } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LanguageIcon from '@material-ui/icons/Language';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PersonIcon from '@material-ui/icons/Person';
import onClose from '../onClose.js';

let Account = ({ 
	aria, 
}) => {
	const anchorEl = useSelector((state) => state.menu[aria]
		? state.menu[aria].anchorEl
		: null);
	const [ lang, setLang ] = React.useState(() => false);
	const _onLang = React.useCallback(() => setLang((currentState) => !currentState), [
		setLang,
	]);
	const _onClose = React.useCallback((e) => {
		setLang(false);
		onClose(e, aria);
	}, [
		setLang,
		aria,
	]);

	return <React.Fragment>
		<Menu
			keepMounted
			id={aria}
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={_onClose}>
			<MenuItem>
				<ListItemAvatar>
					<PersonIcon />
				</ListItemAvatar>
				<Typography>
					Аккаунт
				</Typography>
			</MenuItem>
			<MenuItem onClick={_onLang}>
				<ListItemIcon>
					{typeof String.fromCodePoint === 'function'
						?  'RU'.replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
						: <LanguageIcon />}
				</ListItemIcon>
				<Typography>
					Язык
				</Typography>
				{lang 
					? <ExpandLessIcon /> 
					: <ExpandMoreIcon />}
			</MenuItem>
			<Collapse 
				unmountOnExit
				in={lang} 
				timeout="auto">
				<List component="nav">
					<ListItem button>
						<ListItemIcon>
							{typeof String.fromCodePoint === 'function'
								?  'UA'.replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
								: <LanguageIcon />}
						</ListItemIcon>
						<Typography>
							UA
						</Typography>
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							{typeof String.fromCodePoint === 'function'
								?  'RU'.replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
								: <LanguageIcon />}
						</ListItemIcon>
						<Typography>
							RU
						</Typography>
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							{typeof String.fromCodePoint === 'function'
								?  'GB'.replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
								: <LanguageIcon />}
						</ListItemIcon>
						<Typography>
							EN
						</Typography>
					</ListItem>
				</List>
			</Collapse>
			<MenuItem>
				<ListItemAvatar>
					<MeetingRoomIcon />
				</ListItemAvatar>
				<Typography>
					Выход
				</Typography>
			</MenuItem>
		</Menu>
	</React.Fragment>;
};

Account = React.memo(Account);
Account.defaultProps = {
	aria: 'menu-account',
};

export default Account;
