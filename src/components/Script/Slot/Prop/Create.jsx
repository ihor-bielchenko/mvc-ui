import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import MenuEntity from 'components/Menu/Entity';
import onMenu from 'components/Menu/onMenu.js';
import Slot from '../Slot';

let Create = ({
	id,
	withControl,
}) => {
	return <React.Fragment>
		<Slot backgroundColor="#FFF">
			<Button 
				fullWidth
				startIcon={<AddIcon />}
				color="primary"
				style={{
					height: 70,
					borderRadius: 0,
				}}
				onClick={onMenu('menu-entity-'+ id)}>
				Добавить
			</Button>
			<MenuEntity aria={'menu-entity-'+ id} />
		</Slot>
	</React.Fragment>;
};

Create = React.memo(Create);
Create.defaultProps = {
	withControl: false,
	id: 0,
};

export default Create;
