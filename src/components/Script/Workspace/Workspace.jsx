import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { FUNC_CATEGORY_IF } from 'structures/funcCategories.js';
import funcTemplates from 'structures/funcTemplates.js';
import {
	Create,
	entities,
} from '../Slot';
import Arrows from '../Arrows';

const BoxBackgraund = styled(Box)`
	background-image: linear-gradient(rgba(198, 198, 198, .2) .1em, transparent .1em), linear-gradient(90deg, rgba(198, 198, 198, .2) .1em, transparent .1em);
	background-size: 20px 20px;
`;
let Build = ({
	scriptId,
	arrow,
}) => {
	const _arrow = arrow();
	const arrows = useSelector((state) => state.script[scriptId].arrows);
	const entity = useSelector((state) => state.script[scriptId].data[(_arrow || {}).to_entity_id]);
	const nextArrows = arrows.filter((arrow) => arrow.from_entity_id === _arrow.to_entity_id);
	
	if (!entity) {
		return <React.Fragment />;
	}

	let _slotName,
		_id;

	if (entity.entity_prop) {
		_slotName = 'Prop';
		_id = entity.entity_prop.id;
	}
	if (entity.entity_json) {
		_slotName = 'Json';
		_id = entity.entity_json.id;
	}
	if (entity.entity_func) {
		if (funcTemplates[entity.entity_func.template_id].category_id === FUNC_CATEGORY_IF.id) {
			_slotName = 'Condition';
		}
		else {
			_slotName = 'Func';
		}
		_id = entity.entity_func.id;
	}
	const SlotEntiy = entities[_slotName];
	let arrowDefault,
		arrowFalse,
		arrowTrue;

	nextArrows.forEach((arrow) => {
		if (arrow.arrow_type_id === process.env.ARROW_TYPE_DEFAULT) {
			arrowDefault = { ...arrow };
		}
		if (arrow.arrow_type_id === process.env.ARROW_TYPE_FALSE) {
			arrowFalse = { ...arrow };
		}
		if (arrow.arrow_type_id === process.env.ARROW_TYPE_TRUE) {
			arrowTrue = { ...arrow };
		}
	});

	return <React.Fragment>
		{entity
			? <Box 
				position="relative"
				minWidth="420px">
				<Box py="34px">
					<SlotEntiy 
						scriptId={scriptId}
						entityId={entity.id}
						id={_id} />
				</Box>
				{(_slotName === 'Condition')
					? <Box
						position="relative"
						display="flex"
						alignItems="flex-start"
						justifyContent="center">
						{arrowFalse
							? <Build
								scriptId={scriptId}
								arrow={() => arrowFalse} />
							: <Box 
								position="relative"
								minWidth="300px">
								<Box py="34px">
									<Create
										scriptId={scriptId}
										fromEntityId={entity.id}
										fromArrowTypeId={process.env.ARROW_TYPE_FALSE} />
								</Box>
							</Box>}
						{arrowTrue
							? <Build
								scriptId={scriptId}
								arrow={() => arrowTrue} />
							: <Box 
								position="relative"
								minWidth="300px">
								<Box py="34px">
									<Create
										scriptId={scriptId}
										fromEntityId={entity.id}
										fromArrowTypeId={process.env.ARROW_TYPE_TRUE} />
								</Box>
							</Box>}
					</Box>
					: arrowDefault
						? <Build
							scriptId={scriptId}
							arrow={() => arrowDefault} />
						: <Box py="34px">
							<Create
								scriptId={scriptId}
								fromEntityId={entity.id}
								fromArrowTypeId={process.env.ARROW_TYPE_DEFAULT} />
						</Box>}
			</Box>
			: <React.Fragment />}
	</React.Fragment>;
};
Build = React.memo(Build);
Build.defaultProps = {
	scriptId: 0,
	arrow: () => {},
};

let Listing = ({ id }) => {
	// const data = useSelector((state) => state.script[id].data);
	const arrows = useSelector((state) => state.script[id].arrows);
	const firstArrow = arrows.find((arrow) => arrow.from_entity_id === 0);

	return <React.Fragment>
		<Box width="max-content">
			{firstArrow
				? <React.Fragment>
					<Build 
						scriptId={id}
						arrow={() => firstArrow} />
					<Arrows scriptId={id} />
				</React.Fragment>
				: <React.Fragment />}
		</Box>
	</React.Fragment>;
};
Listing = React.memo(Listing);
Listing.defaultProps = {
	id: 0,
};

let Workspace = ({ id }) => {
	const loadedFlag = useSelector((state) => state.script[id].loadedFlag);

	return <React.Fragment>
		<BoxBackgraund
			position="relative"
			overflow="auto"
			width="100%"
			height="calc(100% - 48px)">
			{loadedFlag
				? <Listing id={id} />
				: <React.Fragment />}
		</BoxBackgraund>
	</React.Fragment>;
};

Workspace = React.memo(Workspace);
Workspace.defaultProps = {
	id: 0,
};

export default Workspace;
