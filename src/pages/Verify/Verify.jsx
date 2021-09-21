import React from 'react';
import { withRouter } from 'react-router-dom';
import { URL_PAGE_DASHBOARD } from 'consts/url.js';

let Verify = ({ history: { push } }) => {
	// onMount
	React.useEffect(() => {
		window.location.search
			.slice(1)
			.split('&')
			.forEach((item) => {
				const [ key, value ] = item.split('=');

				if (key && value) {
					localStorage.setItem(key, value);
				}
			});
			setTimeout(() => {
				push(URL_PAGE_DASHBOARD);
			}, 0);
	}, [
		push,
	]);

	return <React.Fragment />;
};

Verify = React.memo(withRouter(Verify));

export default Verify;
