import React from 'react';
// import { useSelector } from 'react-redux';
import ComponentService from 'components/Service';

let Service = () => {
	return <React.Fragment>
		<ComponentService />
	</React.Fragment>;
};

Service = React.memo(Service);
Service.defaultProps = {
};

export default Service;
