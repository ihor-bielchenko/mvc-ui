import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Store from 'components/Store';
import Placeholder from './Placeholder.jsx';

let Url = () => {
	const routeId = useSelector((state) => state.jsObject.tempValue.route_id);
	const routeIndex = useSelector((state) => state.routes.data.findIndex((routeItem) => routeItem.id === routeId));
	const domainPath = useSelector((state) => state.routes.data[routeIndex].domain_path);
	const url = (Store().getState().routes.data[routeIndex] || {}).url || [];

	return <Box py={6}>
		<Grid 
			container
			alignItems="center"
			spacing={1}>
			<Grid
				item
				xs="auto">
				<Typography>
					{domainPath}
				</Typography>
			</Grid>
			<Grid
				item
				xs="auto">
				<Typography>
					/
				</Typography>
			</Grid>
			{url.map((urlItem, i) => <Placeholder 
				key={urlItem.id}
				index={i}
				length={url.length}
				routeId={routeId}
				urlTypeId={urlItem.route_url_type_id}
				id={urlItem.id}
				label={urlItem.value} />)}
		</Grid>
	</Box>;
};

Url = React.memo(Url);
Url.defaultProps = {
};

export default Url;
