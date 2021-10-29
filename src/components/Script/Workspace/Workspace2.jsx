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
const findTreeDownByArrows = (entityId, arrowTypeId, arrows, collector = [], firstFlag = true) => {
	const nextArrow = arrows.find((arrow) => arrow.from_entity_id === entityId);

	if (nextArrow
		|| (nextArrow && firstFlag && arrowTypeId)) {
		collector.push(nextArrow);
		collector = findTreeDownByArrows(nextArrow.to_entity_id, arrowTypeId, arrows, collector, false);
	}
	return collector;
};
const findTreeUpByArrows = (entityId, arrowTypeId, arrows, collector = []) => {
	const prevArrow = arrows.find((arrow) => arrow.to_entity_id === entityId);
	const _antiArrowTypeId = arrowTypeId === process.env.ARROW_TYPE_TRUE
		? process.env.ARROW_TYPE_FALSE
		: process.env.ARROW_TYPE_TRUE;

	if (prevArrow) {
		if (prevArrow.arrow_type_id === process.env.ARROW_TYPE_DEFAULT
			|| ) {
			collector.push(prevArrow);

			collector = findTreeUpByArrows(prevArrow.from_entity_id, arrowTypeId, arrows, collector);
		}
		else if (prevArrow.arrow_type_id === arrowTypeId) {
			collector.push(prevArrow);
		}
	}
	return collector;
};
// цикл по перебору стрелок с передачей индекса в рекурсии для оптимизации рессурсов
// логика промисов
const build2 = (entityId, arrows, index = 0, temp) => {
	temp = temp ?? { 
		[entityId]: {
			x: 0,
			y: 40,
		},
	};

	while (index < arrows) {
		const _arrow = arrows[i];

		index++;
	}
};

const build = (entityId, arrows, temp) => {
	temp = temp ?? { 
		[entityId]: [ 
			process.env.ARROW_TYPE_DEFAULT, 
			entityId,
			0, 
			40, 
			true,
			process.env.ARROW_TYPE_DEFAULT, 
		], 
	};
	arrows.forEach((arrow) => {
		if (arrow.from_entity_id === entityId) {
			temp[arrow.to_entity_id] = new Array(5).fill(0);
			temp[entityId][4] = false;

			if (arrow.arrow_type_id === process.env.ARROW_TYPE_DEFAULT) {
				temp[arrow.to_entity_id][0] = temp[entityId][0];
				temp[arrow.to_entity_id][1] = temp[entityId][1];
				temp[arrow.to_entity_id][2] = temp[entityId][2];
			}
			if (arrow.arrow_type_id === process.env.ARROW_TYPE_TRUE) {
				temp[arrow.to_entity_id][0] = process.env.ARROW_TYPE_TRUE;

				if (temp[entityId][0] === process.env.ARROW_TYPE_FALSE) {
					const upArrows = findTreeUpByArrows(entityId, process.env.ARROW_TYPE_FALSE, arrows);

					if (upArrows[upArrows.length - 1].arrow_type_id === process.env.ARROW_TYPE_FALSE) {
						console.log('upArrows', upArrows[upArrows.length - 1]);
						const downArrows = findTreeDownByArrows(upArrows[upArrows.length - 1].to_entity_id, process.env.ARROW_TYPE_FALSE, arrows);

						upArrows.forEach((item, ii) => {
							if (ii < upArrows.length - 1) {
								temp[item.from_entity_id][2] -= 400;
							}
						});
						downArrows.forEach((item, ii) => {
							if (temp[item.to_entity_id]) {
								temp[item.to_entity_id][2] -= 400;
							}
						});
					}
					temp[arrow.to_entity_id][0] = process.env.ARROW_TYPE_FALSE;
				}
				temp[arrow.to_entity_id][1] = arrow.to_entity_id;
				temp[arrow.to_entity_id][2] = temp[entityId][2] + 400;
			}
			if (arrow.arrow_type_id === process.env.ARROW_TYPE_FALSE) {
				temp[arrow.to_entity_id][0] = process.env.ARROW_TYPE_FALSE;

				if (temp[entityId][0] === process.env.ARROW_TYPE_TRUE) {
					const upArrows = findTreeUpByArrows(entityId, process.env.ARROW_TYPE_TRUE, arrows);

					if (upArrows[upArrows.length - 1].arrow_type_id === process.env.ARROW_TYPE_TRUE) {
						const downArrows = findTreeDownByArrows(entityId, process.env.ARROW_TYPE_TRUE, arrows);

						upArrows.forEach((item, ii) => {
							temp[item.to_entity_id][2] += 400;
						});
						downArrows.forEach((item, ii) => {
							if (temp[item.to_entity_id]) {
								temp[item.to_entity_id][2] += 400;
							}
						});
					}
					temp[arrow.to_entity_id][0] = process.env.ARROW_TYPE_TRUE;
				}
				temp[arrow.to_entity_id][1] = arrow.to_entity_id;
				temp[arrow.to_entity_id][2] = temp[entityId][2] - 400;
			}
			temp[arrow.to_entity_id][3] = temp[entityId][3] + 162;
			temp[arrow.to_entity_id][4] = true;
			temp[arrow.to_entity_id][5] = arrow.arrow_type_id;
			temp = build(arrow.to_entity_id, arrows, temp);
		}
	});
	return temp;
};

let Listing = ({ id }) => {
	const data = useSelector((state) => state.script[id].data);
	const arrows = useSelector((state) => state.script[id].arrows);

	return <React.Fragment>
		<Box width="200%">
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
						? (() => {
							const firstEntity = data.find((entity) => entity.as_start);
							
							if (firstEntity) {
								const buildData = build(firstEntity.id, arrows);
							
								console.log('buildData', buildData);

								return data.map((entity, i) => {
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

									return SlotEntiy && buildData[entity.id]
										? <React.Fragment key={entity.id}>
											<SlotEntiy 
												scriptId={id}
												entityId={entity.id}
												id={_id}
												index={i}
												x={buildData[entity.id][2]}
												y={buildData[entity.id][3]} />
											{buildData[entity.id][4]
												? <React.Fragment>
													{_slotName === 'Condition'
														? <React.Fragment>
															<Create
																x={buildData[entity.id][2] - 400}
																y={buildData[entity.id][3] + 162}
																fromEntityId={entity.id}
																fromArrowTypeId={process.env.ARROW_TYPE_FALSE} />
															<Create
																x={buildData[entity.id][2] + 400}
																y={buildData[entity.id][3] + 162}
																fromEntityId={entity.id}
																fromArrowTypeId={process.env.ARROW_TYPE_TRUE} />
														</React.Fragment>
														: <React.Fragment>
															<Create
																x={buildData[entity.id][2]}
																y={buildData[entity.id][3] + 162}
																fromEntityId={entity.id}
																fromArrowTypeId={process.env.ARROW_TYPE_DEFAULT} />
														</React.Fragment>}
												</React.Fragment>
												: <React.Fragment />}
										</React.Fragment>
										: <React.Fragment key={entity.id} />
								});
							}
							else {
								return <React.Fragment />;
							}
						})()
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
