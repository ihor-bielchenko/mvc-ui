import React from 'react';
import { useSelector } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ViewListIcon from '@material-ui/icons/ViewList';
import LanguageIcon from '@material-ui/icons/Language';
import AirplayIcon from '@material-ui/icons/Airplay';
import StorageIcon from '@material-ui/icons/Storage';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import DescriptionIcon from '@material-ui/icons/Description';
import onClose from '../onClose.js';

let Service = ({ 
	aria, 
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
			<MenuItem>
				<ListItemAvatar>
					<ViewListIcon />
				</ListItemAvatar>
				<Typography>
					Все сервисы
				</Typography>
			</MenuItem>
			<Divider />
			<MenuItem>
				<ListItemAvatar>
					<LanguageIcon />
				</ListItemAvatar>
				<Typography>
					Имя сервиса
				</Typography>
			</MenuItem>
			<Divider />
			<MenuItem>
				<ListItemAvatar>
					<AirplayIcon />
				</ListItemAvatar>
				<Typography>
					API
				</Typography>
			</MenuItem>
			<MenuItem disabled>
				<ListItemAvatar>
					<ScheduleIcon />
				</ListItemAvatar>
				<Typography>
					CRON
				</Typography>
			</MenuItem>
			<MenuItem>
				<ListItemAvatar>
					<StorageIcon />
				</ListItemAvatar>
				<Typography>
					База данных
				</Typography>
			</MenuItem>
			<MenuItem disabled>
				<ListItemAvatar>
					<LibraryBooksIcon />
				</ListItemAvatar>
				<Typography>
					Логи
				</Typography>
			</MenuItem>
			<Divider />
			<MenuItem disabled>
				<ListItemAvatar>
					<DescriptionIcon />
				</ListItemAvatar>
				<Typography>
					Документация
				</Typography>
			</MenuItem>
		</Menu>
	</React.Fragment>;
};

Service = React.memo(Service);
Service.defaultProps = {
	aria: 'menu-service',
};

export default Service;
