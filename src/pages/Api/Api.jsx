import React from 'react';
// import { useSelector } from 'react-redux';
import ComponentApi from 'components/Api';

let Api = () => {
	return <React.Fragment>
		<ComponentApi />
	</React.Fragment>;
};

Api = React.memo(Api);
Api.defaultProps = {
};

export default Api;
