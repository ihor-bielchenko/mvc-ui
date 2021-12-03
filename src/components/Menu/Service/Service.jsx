import React from 'react';
import { useSelector } from 'react-redux';
import { 
	Link,
	withRouter, 
} from 'react-router-dom';
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
import { 
	URL_PAGE_DASHBOARD,
	URL_PAGE_SERVICE, 
	URL_PAGE_API,
	URL_PAGE_DB,
} from 'consts/url.js';
import onClose from '../onClose.js';

let Service = ({ 
	aria, 
	history,
}) => {
	const anchorEl = useSelector((state) => state.menu[aria]
		? state.menu[aria].anchorEl
		: null);
	const _onClose = React.useCallback((e) => onClose(e, aria), [
		aria,
	]);
	const serviceId = useSelector((state) => state.services.form.id);
	const serviceName = useSelector((state) => state.services.form.name);
	const url = history
		.location
		.pathname
		.split('/');
	let render = [
		<MenuItem
			key="dashboard"
			{ ...history.location.pathname.includes(URL_PAGE_DASHBOARD)
				? {
					disabled: true,
				}
				: {
					component: Link,
					to: `/${URL_PAGE_DASHBOARD}`,
				} }>
			<ListItemAvatar>
				<ViewListIcon />
			</ListItemAvatar>
			<Typography>
				Все сервисы
			</Typography>
		</MenuItem>,
	];

	if (serviceId > 0 && serviceName) {
		render = [
			...render,
			<Divider key="service-divider" />,
			<MenuItem 
				key="service-name"
				{ ...!url[4]
					? {
						disabled: true,
					}
					: {
						component: Link,
						to: `/${url[1]}/${URL_PAGE_SERVICE}/${url[3]}`,
					} }>
				<ListItemAvatar>
					<LanguageIcon />
				</ListItemAvatar>
				<Typography>
					{serviceName}
				</Typography>
			</MenuItem>,
			<Divider key="service-divider-2" />,
			<MenuItem 
				key="service-api"
				{ ...(url[4] === URL_PAGE_API && !url[5])
					? {
						disabled: true,
					}
					: {
						component: Link,
						to: `/${url[1]}/${URL_PAGE_SERVICE}/${url[3]}/${URL_PAGE_API}`,
					}}>
				<ListItemAvatar>
					<AirplayIcon />
				</ListItemAvatar>
				<Typography>
					API
				</Typography>
			</MenuItem>,
			<MenuItem 
				key="service-cron"
				disabled>
				<ListItemAvatar>
					<ScheduleIcon />
				</ListItemAvatar>
				<Typography>
					CRON
				</Typography>
			</MenuItem>,
			<MenuItem 
				key="service-db"
				{ ...(url[4] === URL_PAGE_DB && !url[5])
					? {
						disabled: true,
					}
					: {
						component: Link,
						to: `/${url[1]}/${URL_PAGE_SERVICE}/${url[3]}/${URL_PAGE_DB}`,
					}}>
				<ListItemAvatar>
					<StorageIcon />
				</ListItemAvatar>
				<Typography>
					База данных
				</Typography>
			</MenuItem>,
			<MenuItem 
				key="service-logs"
				disabled>
				<ListItemAvatar>
					<LibraryBooksIcon />
				</ListItemAvatar>
				<Typography>
					Логи
				</Typography>
			</MenuItem>,
		];
	}
	render = [
		...render,
		<Divider key="docs-divider" />,
		<MenuItem 
			disabled
			key="docs">
			<ListItemAvatar>
				<DescriptionIcon />
			</ListItemAvatar>
			<Typography>
				Документация
			</Typography>
		</MenuItem>,
	];

	return <React.Fragment>
		<Menu
			keepMounted
			id={aria}
			anchorEl={anchorEl}
			open={Boolean(anchorEl)}
			onClose={_onClose}>
			{render}
		</Menu>
	</React.Fragment>;
};

Service = React.memo(Service);
Service.defaultProps = {
	aria: 'menu-service',
};

export default withRouter(Service);
