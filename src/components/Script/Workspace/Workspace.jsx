import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import {
	Create,
	entities,
} from '../Slot';
import Arrow from '../Arrow';

const BoxBackgraund = styled(Box)`
	background-image: linear-gradient(rgba(198, 198, 198, .2) .1em, transparent .1em), linear-gradient(90deg, rgba(198, 198, 198, .2) .1em, transparent .1em);
	background-size: 20px 20px;
`;
let Build = ({
	scriptId,
	workspaceId,
	arrow,
	isSource,
	dataTypeValidating,
	onClickAsSource,
}) => {
	const _arrow = arrow();
	const arrows = useSelector((state) => state.script[workspaceId].arrows);
	const entity = useSelector((state) => state.script[workspaceId].data[(_arrow || {}).to_entity_id]);
	const nextArrows = arrows.filter((arrow) => arrow.from_entity_id === _arrow.to_entity_id);
	
	if (!entity) {
		return <React.Fragment />;
	}
	const SlotEntiy = entities[entity.slotName];
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
		{(entity && entity.entityItemId > 0)
			? <Box 
				position="relative"
				minWidth="420px">
				<Box py="34px">
					<SlotEntiy 
						scriptId={scriptId}
						workspaceId={workspaceId}
						entityId={entity.id}
						id={entity.entityItemId}
						isSource={isSource}
						dataTypeValidating={dataTypeValidating}
						onClickAsSource={onClickAsSource} />
				</Box>
				{isSource
					? <React.Fragment />
					: (entity.slotName === 'Condition')
						? <Box
							position="relative"
							display="flex"
							alignItems="flex-start"
							justifyContent="center">
							{arrowFalse
								? <Build
									scriptId={scriptId}
									workspaceId={workspaceId}
									arrow={() => arrowFalse}
									isSource={isSource}
									dataTypeValidating={dataTypeValidating}
									onClickAsSource={onClickAsSource} />
								: <Box 
									position="relative"
									minWidth="300px">
									<Box py="34px">
										<Create
											scriptId={scriptId}
											workspaceId={workspaceId}
											fromEntityId={entity.id}
											fromArrowTypeId={process.env.ARROW_TYPE_FALSE} />
									</Box>
								</Box>}
							{arrowTrue
								? <Build
									scriptId={scriptId}
									workspaceId={workspaceId}
									arrow={() => arrowTrue}
									isSource={isSource}
									dataTypeValidating={dataTypeValidating}
									onClickAsSource={onClickAsSource} />
								: <Box 
									position="relative"
									minWidth="300px">
									<Box py="34px">
										<Create
											scriptId={scriptId}
											workspaceId={workspaceId}
											fromEntityId={entity.id}
											fromArrowTypeId={process.env.ARROW_TYPE_TRUE} />
									</Box>
								</Box>}
						</Box>
						: arrowDefault
							? <Build
								scriptId={scriptId}
								workspaceId={workspaceId}
								arrow={() => arrowDefault}
								isSource={isSource}
								dataTypeValidating={dataTypeValidating}
								onClickAsSource={onClickAsSource} />
							: <Box py="34px">
								<Create
									scriptId={scriptId}
									workspaceId={workspaceId}
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
	workspaceId: 0,
	arrow: () => {},
	isSource: false,
	dataTypeValidating: () => ([]),
	onClickAsSource: () => {},
};

let Listing = ({ 
	workspaceId,
	scriptId,
	isSource,
	dataTypeValidating,
	onClickAsSource,
}) => {
	const arrows = useSelector((state) => state.script[workspaceId].arrows);
	const firstArrow = arrows.find((arrow) => arrow.from_entity_id === 0);

	return <React.Fragment>
		<Box 
			width="max-content"
			minWidth="100%">
			{firstArrow
				? <React.Fragment>
					<Build 
						scriptId={scriptId}
						workspaceId={workspaceId}
						arrow={() => firstArrow}
						isSource={isSource}
						dataTypeValidating={dataTypeValidating}
						onClickAsSource={onClickAsSource} />
					{arrows.map((arrow, i) => {
						return <Arrow 
							key={arrow.id}
							scriptId={scriptId}
							workspaceId={workspaceId}
							id={arrow.id}
							fromEntityId={arrow.from_entity_id}
							toEntityId={arrow.to_entity_id}
							arrowTypeId={arrow.arrow_type_id} />;
					})}
				</React.Fragment>
				: isSource
					? <React.Fragment />
					: <Box py="34px">
						<Create 
							scriptId={scriptId}
							workspaceId={workspaceId} />
					</Box>}
		</Box>
	</React.Fragment>;
};
Listing = React.memo(Listing);
Listing.defaultProps = {
	workspaceId: 0,
	scriptId: 0,
	isSource: false,
	dataTypeValidating: () => ([]),
	onClickAsSource: () => {},
};

let Workspace = ({ 
	workspaceId,
	scriptId,
	isSource,
	dataTypeValidating,
	onClickAsSource,
}) => {
	const loadedFlag = useSelector((state) => (state.script[workspaceId] || {}).loadedFlag);

	return <React.Fragment>
		<BoxBackgraund
			position="relative"
			overflow="auto"
			width="100%"
			height="calc(100% - 58px)">
			{loadedFlag
				? <Listing 
					workspaceId={workspaceId}
					scriptId={scriptId}
					isSource={isSource}
					dataTypeValidating={dataTypeValidating}
					onClickAsSource={onClickAsSource} />
				: <React.Fragment />}
		</BoxBackgraund>
	</React.Fragment>;
};

Workspace = React.memo(Workspace);
Workspace.defaultProps = {
	workspaceId: 0,
	scriptId: 0,
	isSource: false,
	dataTypeValidating: () => ([]),
	onClickAsSource: () => {},
};

export default Workspace;
