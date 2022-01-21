import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
import { getLang } from 'components/Language';
import { URL_PAGE_ACCOUNT } from 'consts/url.js';
import onClose from '../onClose.js';
import onExit from './onExit.js';

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
			<MenuItem
				{ ...window.location.pathname.includes(URL_PAGE_ACCOUNT)
					? {
						disabled: true,
					}
					: {
						component: Link,
						to: `/${URL_PAGE_ACCOUNT}`,
					} }>
				<ListItemAvatar>
					<PersonIcon />
				</ListItemAvatar>
				<Typography>
					{getLang('cmpMenuAccount')}
				</Typography>
			</MenuItem>
			<MenuItem onClick={_onLang}>
				<ListItemIcon>
					{typeof String.fromCodePoint === 'function'
						?  'RU'.replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
						: <LanguageIcon />}
				</ListItemIcon>
				<Typography>
					{getLang('cmpMenuAccountLang')}
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
					<ListItem button disabled>
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
					<ListItem button disabled>
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
			<MenuItem onClick={onExit}>
				<ListItemAvatar>
					<MeetingRoomIcon />
				</ListItemAvatar>
				<Typography>
					{getLang('cmpMenuAccountExit')}
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
