import React from 'react';
import Xarrow from 'react-xarrows';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import MenuEntity from 'components/Menu/Entity';
import onMenu from 'components/Menu/onMenu.js';
import Slot from '../Slot';
import { TypographyLabel } from '../../Arrow';

let Create = ({ 
	scriptId,
	withControl,
	fromEntityId,
	fromArrowTypeId,
}) => {
	const _id = React.useMemo(() => Date.now(), []);
	let startArrowName,
		createArrowName,
		arrowIsTrue,
		arrowIsFalse;

	switch (fromArrowTypeId) {
		case process.env.ARROW_TYPE_TRUE:
			startArrowName = 'true-';
			createArrowName = 'create-true-';
			arrowIsTrue = true;
			break;
		case process.env.ARROW_TYPE_FALSE:
			startArrowName = 'false-';
			createArrowName = 'create-false-';
			arrowIsFalse = true;
			break;
		case process.env.ARROW_TYPE_DEFAULT:
		default:
			startArrowName = 'default-';
			createArrowName = 'create-default-';
			break;
	}

	return <React.Fragment>
		<Slot 
			scriptId={scriptId}
			entityId={fromEntityId}
			withControl={withControl}
			backgroundColor="#FFF">
			<Box 
				id={createArrowName + scriptId +'-'+ fromEntityId}
				position="absolute"
				top='-3px'
				left="50%"
				width="0px"
				height="0px" />
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
				fromArrowTypeId={fromArrowTypeId} />
		</Slot>
		<Xarrow
			start={startArrowName + scriptId +'-'+ fromEntityId}
			end={createArrowName + scriptId +'-'+ fromEntityId}
			path="straight"
			strokeWidth={4}
			color="#616161"
			label={{
				middle: arrowIsTrue
					? <TypographyLabel style={{ color: '#4caf50' }}>
						<b>TRUE</b>
					</TypographyLabel>
					: arrowIsFalse
						? <TypographyLabel style={{ color: '#f44336' }}>
							<b>FALSE</b>
						</TypographyLabel>
						: <React.Fragment />
			}} />
	</React.Fragment>;
};

Create = React.memo(Create);
Create.defaultProps = {
	scriptId: 0,
	withControl: false,
	fromEntityId: 0,
	fromArrowTypeId: process.env.ARROW_TYPE_DEFAULT,
};

export default Create;
