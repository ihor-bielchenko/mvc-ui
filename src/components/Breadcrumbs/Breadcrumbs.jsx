import React from 'react';
import { Link } from 'react-router-dom';
import BreadcrumbsMaterial from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { 
	URL_PAGE_DASHBOARD,
	URL_PAGE_ROUTE,
} from 'consts/url.js';

let Breadcrumbs = () => {
	return <React.Fragment>
		<BreadcrumbsMaterial>
			<Link to={URL_PAGE_DASHBOARD}>
				<Typography>
					Все сервисы
				</Typography>
			</Link>
			<Link to={URL_PAGE_ROUTE}>
				<Typography>
					Сервис
				</Typography>
			</Link>
			<Link to={URL_PAGE_ROUTE}>
				<Typography>
					API
				</Typography>
			</Link>
			<Link to={URL_PAGE_ROUTE}>
				<Typography>
					Роут
				</Typography>
			</Link>
		</BreadcrumbsMaterial>
	</React.Fragment>;
};

Breadcrumbs = React.memo(Breadcrumbs);
Breadcrumbs.defaultProps = {
};

export default Breadcrumbs;
