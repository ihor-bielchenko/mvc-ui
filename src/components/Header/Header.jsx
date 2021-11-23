import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Breadcrumbs from 'components/Breadcrumbs';
import MenuService from 'components/Menu/Service';
import MenuAccount from 'components/Menu/Account';
import onMenu from 'components/Menu/onMenu.js';
import { 
	DIALOG_PROP,
	DIALOG_JSON,
	DIALOG_FUNC,
	DIALOG_IF, 
} from 'consts/dialog.js';

let Header = ({ 
	children,
	border, 
	backgroundColor,
}) => {
	const dialog = useSelector((state) => state.dialogs[DIALOG_PROP]
		?? state.dialogs[DIALOG_JSON]
		?? state.dialogs[DIALOG_FUNC]
		?? state.dialogs[DIALOG_IF]);

	return dialog
		? <React.Fragment />
		: <Box 
			display="flex"
			alignItems="center"
			justifyContent="space-between"
			position={children
				? 'fixed'
				: 'static'}
			zIndex="2"
			top="0px"
			left="0px"
			width="calc(100% - 24px)"
			height="64px"
			style={{
				backgroundColor: backgroundColor
					? backgroundColor
					: 'initial',
			}}>
			<Box
				position="relative"
				width="48px"
				height="48px"
				mx="10px">
				<IconButton 
					onClick={onMenu('menu-main-service')}
					style={{
						position: children
							? 'inherit'
							: 'fixed',
						backgroundColor: '#FFF',
						border: '1px solid #EFEFEF',
						borderRadius: '50% 50%',
					}}>
					<MenuIcon />
				</IconButton>
				<MenuService aria="menu-main-service" />
			</Box>
			{children
				? children
				: <Box width="calc(100% - 192px)">
					<Box
						display="flex"
						alignItems="center"
						height="48px"
						width="max-content"
						maxWidth="680px"
						overflow="hidden"
						mr="10px"
						px="4px"
						style={{
							backgroundColor: '#FFF',
							border: '1px solid #EFEFEF',
							borderRadius: '7px',
						}}>
						<Breadcrumbs />	
					</Box>
				</Box>}
			<Box
				position="relative"
				width="48px"
				height="48px"
				mx="10px">
				<IconButton 
					onClick={onMenu('menu-main-account')}
					style={{
						position: children
							? 'inherit'
							: 'fixed',
						backgroundColor: '#FFF',
						border: '1px solid #EFEFEF',
						borderRadius: '50% 50%',
					}}>
					<AccountCircleIcon />
				</IconButton>
				<MenuAccount aria="menu-main-account" />
			</Box>
		</Box>;
};

Header = React.memo(Header);
Header.defaultProps = {
	border: false,
};

export default Header;
