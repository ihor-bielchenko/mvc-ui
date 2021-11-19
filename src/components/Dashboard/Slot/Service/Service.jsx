import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Slot from '../Slot.jsx';

let Service = ({ 
	projectId,
	serviceId, 
}) => {
	const color = useSelector((state) => state.list.data[projectId].services[serviceId].color);
	const name = useSelector((state) => state.list.data[projectId].services[serviceId].name);

	return <React.Fragment>
		<Slot
			projectId={projectId}
			serviceId={serviceId}>
			<Button
				fullWidth
				disableElevation
				variant="contained"
				style={{
					backgroundColor: color,
					color: '#FFF',
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
				}}>
				<Typography variant="subtitle1">
					{name}
				</Typography>
			</Button>
		</Slot>
	</React.Fragment>;
};

Service = React.memo(Service);
Service.defaultProps = {
	projectId: 0,
	serviceId: 0,
};

export default Service;
