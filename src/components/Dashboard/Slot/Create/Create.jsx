import React from 'react';
// import { useSelector } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import onDialog from 'components/Dialog/onDialog.js';
import { DIALOG_SERVICE_TEMPLATE } from 'consts/dialog.js';
import Slot from '../Slot.jsx';
import { getLang } from 'components/Language';

let Create = ({ 
	projectId,
	serviceId, 
}) => {
	return <React.Fragment>
		<Slot
			projectId={projectId}
			serviceId={serviceId}>
			<Button
				fullWidth
				disableElevation
				variant="contained"
				startIcon={<AddIcon />}
				onClick={onDialog(DIALOG_SERVICE_TEMPLATE, {
					projectId,
				})}
				style={{
					backgroundColor: '#f3e5f5',
					alignItems: 'center',
					justifyContent: 'center',
				}}>
				<Typography variant="subtitle1">
					{getLang('NewService')}
				</Typography>
			</Button>
		</Slot>
	</React.Fragment>;
};

Create = React.memo(Create);
Create.defaultProps = {
	projectId: 0,
	serviceId: 0,
};

export default Create;
