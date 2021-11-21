import Store from 'components/Store';
import { ROUTE_URL_TYPE_VALUE } from 'structures/routeUrl.js';
import { DIALOG_URL_VALUE } from 'consts/dialog.js';
import onClose from '../onClose.js';

const onSubmit = (e, index) => {
	e.preventDefault();

	const target = e.currentTarget;
	const elements = target.elements;
	const value = elements.value.value;
	const routes = Store().getState().routes;
	const routeUrls = [ ...routes.form.url ];

	if (routeUrls[index]) {
		routeUrls[index].value = value;
	}
	else {
		routeUrls.push({
			id: ((routeUrls[routeUrls.length - 1] || {}).id || 0) + 1,
			route_url_type_id: ROUTE_URL_TYPE_VALUE.id,
			value,
		});
	}
	routes.form.url = [ ...routeUrls ];
	Store().dispatch({
		type: 'routes',
		payload: () => ({ ...routes }),
	});
	onClose(DIALOG_URL_VALUE)();
};

export default onSubmit;
