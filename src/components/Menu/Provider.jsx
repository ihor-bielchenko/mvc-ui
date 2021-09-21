import React from 'react';
import { withRouter } from 'react-router-dom';
import onClose from './onClose.js';

let Provider = ({ location }) => {
	React.useEffect(() => {
		onClose();
	}, [
		location.pathname,
	]);

	return <React.Fragment />;
};

Provider = React.memo(withRouter(Provider));
Provider.defaultProps = {
};

export default Provider;
