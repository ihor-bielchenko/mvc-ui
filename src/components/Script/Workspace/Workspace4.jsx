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

const BoxBackgraund = styled(Box)`
	background-image: linear-gradient(rgba(198, 198, 198, .2) .1em, transparent .1em), linear-gradient(90deg, rgba(198, 198, 198, .2) .1em, transparent .1em);
	background-size: 20px 20px;
`;

let Listing = ({ id }) => {
	const data = useSelector((state) => state.script[id].data);
	const arrows = useSelector((state) => state.script[id].arrows);

	return <React.Fragment>
		<Box width="100%">
			<Box
				position="relative"
				width="0px"
				height="0px"
				margin="0 auto">
				<Box
					position="absolute"
					top="0px"
					left="0px"
					width="0px"
					height="0px"
					ml="-98px">
					{data.length > 0 
						? data.map((entity, i) => {
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
							const findArrows = arrows.filter((arrow) => arrow.from_entity_id === entity.id);

							// console.log('findArrows', findArrows);

							return SlotEntiy
								? <React.Fragment key={entity.id}>
									<SlotEntiy 
										scriptId={id}
										entityId={entity.id}
										id={_id}
										index={i}
										x={entity.x}
										y={entity.y} />
									{(_slotName === 'Condition')
										? findArrows.length === 0
											? <React.Fragment>
												<Create
													viewX={entity.x - 120}
													x={entity.x - 200}
													y={entity.y + 162}
													fromEntityId={entity.id}
													fromArrowTypeId={process.env.ARROW_TYPE_FALSE} />
												<Create
													viewX={entity.x + 120}
													x={entity.x + 200}
													y={entity.y + 162}
													fromEntityId={entity.id}
													fromArrowTypeId={process.env.ARROW_TYPE_TRUE} />
											</React.Fragment>
											: findArrows.length === 1
												? <Create
													viewX={findArrows[0].arrow_type_id === process.env.ARROW_TYPE_FALSE
														? entity.x + 120
														: entity.x - 120}
													x={findArrows[0].arrow_type_id === process.env.ARROW_TYPE_FALSE
														? entity.x + 200
														: entity.x - 200}
													y={entity.y + 162}
													fromEntityId={entity.id}
													fromArrowTypeId={findArrows[0].arrow_type_id === process.env.ARROW_TYPE_FALSE
														? process.env.ARROW_TYPE_TRUE
														: process.env.ARROW_TYPE_FALSE} />
												: <React.Fragment />
										: findArrows.length === 0
											? <Create
												viewX={entity.x}
												x={entity.x}
												y={entity.y + 162}
												fromEntityId={entity.id}
												fromArrowTypeId={process.env.ARROW_TYPE_DEFAULT} />
											: <React.Fragment />}
								</React.Fragment>
								: <React.Fragment key={entity.id} />;
							})
						: <Create />}
				</Box>
			</Box>
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
