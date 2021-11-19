import React from 'react';
// import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

let Service = ({ 
	projectId,
	serviceId, 
}) => {
	const color = useSelector((state) => state.list.data[projectId].services[serviceId].color);
	const name = useSelector((state) => state.list.data[projectId].services[serviceId].name);

	return <React.Fragment>
		<Grid 
			item
			xs={2}
			style={{
				paddingTop: 8,
				paddingBottom: 8,
			}}>
			<Button
				fullWidth
				disableElevation
				variant="contained"
				style={{
					backgroundColor: color,
					textTransform: 'initial',
					textAlign: 'left',
					justifyContent: 'flex-start',
					alignItems: 'flex-start',
					padding: '4px 8px',
					color: '#FFF',
					height: 72,
				}}>
				<Typography variant="subtitle1">
					{name}
				</Typography>
			</Button>
		</Grid>
	</React.Fragment>;
};

Service = React.memo(Service);
Service.defaultProps = {
	projectId: 0,
	serviceId: 0,
};

export default Service;
