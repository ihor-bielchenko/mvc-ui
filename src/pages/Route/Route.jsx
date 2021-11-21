import React from 'react';
// import { useSelector } from 'react-redux';
import ComponentRoute from 'components/Route';

let Route = () => {
	return <React.Fragment>
		<ComponentRoute />
	</React.Fragment>;
};

Route = React.memo(Route);
Route.defaultProps = {
};

export default Route;
