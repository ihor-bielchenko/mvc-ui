import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import {
	Create,
	entities,
} from '../Slot';
import Arrow from '../Arrow';

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
			? <React.Fragment>
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
				{(entity.slotName === 'Condition')
						? <Box
							position="relative"
							display="flex"
							alignItems="flex-start"
							justifyContent="center">
							{arrowFalse
								? <React.Fragment>
									<Box 
										position="relative"
										minWidth="420px">
										<Build
											scriptId={scriptId}
											workspaceId={workspaceId}
											arrow={() => arrowFalse}
											isSource={isSource}
											dataTypeValidating={dataTypeValidating}
											onClickAsSource={onClickAsSource} />
									</Box>
									<Arrow 
										scriptId={scriptId}
										workspaceId={workspaceId}
										id={arrowFalse.id}
										fromEntityId={arrowFalse.from_entity_id}
										toEntityId={arrowFalse.to_entity_id}
										arrowTypeId={arrowFalse.arrow_type_id} />
								</React.Fragment>
								: <Box py="34px">
									<Create
										scriptId={scriptId}
										workspaceId={workspaceId}
										fromEntityId={entity.id}
										fromArrowTypeId={process.env.ARROW_TYPE_FALSE}
										isSource={isSource} />
								</Box>}
							{arrowTrue
								? <React.Fragment>
									<Box 
										position="relative"
										minWidth="420px">
										<Build
											scriptId={scriptId}
											workspaceId={workspaceId}
											arrow={() => arrowTrue}
											isSource={isSource}
											dataTypeValidating={dataTypeValidating}
											onClickAsSource={onClickAsSource} />
									</Box>
									<Arrow 
										scriptId={scriptId}
										workspaceId={workspaceId}
										id={arrowTrue.id}
										fromEntityId={arrowTrue.from_entity_id}
										toEntityId={arrowTrue.to_entity_id}
										arrowTypeId={arrowTrue.arrow_type_id} />
								</React.Fragment>
								: <Box py="34px">
									<Create
										scriptId={scriptId}
										workspaceId={workspaceId}
										fromEntityId={entity.id}
										fromArrowTypeId={process.env.ARROW_TYPE_TRUE}
										isSource={isSource} />
								</Box>}
						</Box>
						: arrowDefault
							? <React.Fragment>
								<Box 
									position="relative"
									minWidth="420px">
									<Build
										scriptId={scriptId}
										workspaceId={workspaceId}
										arrow={() => arrowDefault}
										isSource={isSource}
										dataTypeValidating={dataTypeValidating}
										onClickAsSource={onClickAsSource} />
								</Box>
								<Arrow 
									scriptId={scriptId}
									workspaceId={workspaceId}
									id={arrowDefault.id}
									fromEntityId={arrowDefault.from_entity_id}
									toEntityId={arrowDefault.to_entity_id}
									arrowTypeId={arrowDefault.arrow_type_id} />
							</React.Fragment>
							: <Box py="34px">
								<Create
									scriptId={scriptId}
									workspaceId={workspaceId}
									fromEntityId={entity.id}
									fromArrowTypeId={process.env.ARROW_TYPE_DEFAULT}
									isSource={isSource} />
							</Box>}
			</React.Fragment>
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
			{firstArrow
				? <React.Fragment>
					<Box 
						position="relative"
						minWidth="420px">
						<Build 
							scriptId={scriptId}
							workspaceId={workspaceId}
							arrow={() => firstArrow}
							isSource={isSource}
							dataTypeValidating={dataTypeValidating}
							onClickAsSource={onClickAsSource} />
					</Box>
				</React.Fragment>
				: isSource
					? <React.Fragment />
					: <Box py="34px">
						<Create 
							scriptId={scriptId}
							workspaceId={workspaceId} />
					</Box>}
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

	return loadedFlag
		? <Listing 
			workspaceId={workspaceId}
			scriptId={scriptId}
			isSource={isSource}
			dataTypeValidating={dataTypeValidating}
			onClickAsSource={onClickAsSource} />
		: <React.Fragment />;
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
