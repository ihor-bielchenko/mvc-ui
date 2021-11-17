import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BreadcrumbsMaterial from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { 
	URL_PAGE_DASHBOARD,
	URL_PAGE_ACCOUNT,
	URL_PAGE_SERVICE,
	URL_PAGE_API,
	URL_PAGE_CRON,
	URL_PAGE_DB,
	URL_PAGE_LOG,
} from 'consts/url.js';

let Breadcrumbs = () => {
	const url = window
		.location
		.pathname
		.split('/');
	const serviceName = useSelector((state) => state.services.form.name);
	const render = [
		'/'+ url[1] === URL_PAGE_DASHBOARD
			? <Typography key="all">
				Все сервисы
			</Typography>
			: <Link 
				key="all"
				to={URL_PAGE_DASHBOARD}>
				<Typography>
					Все сервисы
				</Typography>
			</Link>,
	];

	if (url[2] === URL_PAGE_SERVICE 
		&& Number(url[3]) > 0 
		&& serviceName) {
		if (!url[4]) {
			render.push(<Typography key="service">
				{serviceName}
			</Typography>);
		}
		else {
			render.push(<Link 
				key="service"
				to={`/${url[1]}/${URL_PAGE_SERVICE}/${url[3]}`}>
				<Typography>
					{serviceName}
				</Typography>
			</Link>);
			switch (url[4]) {
				case URL_PAGE_API:
					render.push(<Typography key="api">
						API
					</Typography>);
					break;

				case URL_PAGE_CRON:
					render.push(<Typography key="cron">
						CRON
					</Typography>);
					break;

				case URL_PAGE_DB:
					render.push(<Typography key="db">
						База данных
					</Typography>);
					break;

				case URL_PAGE_LOG:
					render.push(<Typography key="logs">
						Логи
					</Typography>);
					break;

				default:
					break;
			}
		}
	}
	else if (url[1] === URL_PAGE_ACCOUNT) {
		render.push(<Typography key="account">
			Аккаунт
		</Typography>);
	}

	return <React.Fragment>
		<BreadcrumbsMaterial>
			{render}
		</BreadcrumbsMaterial>
	</React.Fragment>;
};

Breadcrumbs = React.memo(Breadcrumbs);
Breadcrumbs.defaultProps = {
};

export default Breadcrumbs;
