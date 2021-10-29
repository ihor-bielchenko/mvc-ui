import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import MenuEntity from 'components/Menu/Entity';
import onMenu from 'components/Menu/onMenu.js';
import Slot from '../Slot';

let Create = ({ 
	withControl, 
	viewX,
	x,
	y,
	fromEntityId,
	fromArrowTypeId,
}) => {
	const _id = React.useMemo(() => Date.now(), []);

	return <React.Fragment>
		<Slot 
			withControl={withControl}
			x={viewX}
			y={y}
			backgroundColor="#FFF">
			<Button 
				fullWidth
				startIcon={<AddIcon />}
				color="primary"
				style={{
					height: 70,
					borderRadius: 0,
				}}
				onClick={onMenu('menu-entity-create-'+ _id)}>
				Добавить
			</Button>
			<MenuEntity 
				aria={'menu-entity-create-'+ _id}
				fromEntityId={fromEntityId}
				fromArrowTypeId={fromArrowTypeId}
				x={x}
				y={y} />
		</Slot>
	</React.Fragment>;
};

Create = React.memo(Create);
Create.defaultProps = {
	withControl: false,
	viewX: 0,
	x: 0,
	y: 40,
	fromEntityId: 0,
	fromArrowTypeId: process.env.ARROW_TYPE_DEFAULT,
};

export default Create;
