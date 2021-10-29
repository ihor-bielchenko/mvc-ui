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
import onMount from './onMount.js';

const BoxBackgraund = styled(Box)`
	background-image: linear-gradient(rgba(198, 198, 198, .2) .1em, transparent .1em), linear-gradient(90deg, rgba(198, 198, 198, .2) .1em, transparent .1em);
	background-size: 20px 20px;
`;

let Listing = ({ id }) => {
	const data = useSelector((state) => state.script[id].data);
	const buildData = useSelector((state) => state.script[id].buildData || {});
	const buildDataKeys = Object.keys(buildData);

	// onMount
	React.useEffect(() => {
		onMount(id);
	}, [
		id,
	]);

	console.log('buildData', buildData);

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
						? buildDataKeys.length > 0
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

								return (SlotEntiy && buildData[entity.id])
									? <React.Fragment key={entity.id}>
										<SlotEntiy 
											scriptId={id}
											entityId={entity.id}
											id={_id}
											index={i}
											x={buildData[entity.id].x}
											y={buildData[entity.id].y} />
										<React.Fragment>
											{_slotName === 'Condition'
												? <React.Fragment>
													{buildData[entity.id].last[0]
														? <Create
															x={buildData[entity.id].x - 400}
															y={buildData[entity.id].y + 162}
															fromEntityId={entity.id}
															fromArrowTypeId={process.env.ARROW_TYPE_FALSE} />
														: <React.Fragment />}
													{buildData[entity.id].last[1] === false
														? <React.Fragment />
														: <Create
															x={buildData[entity.id].x + 400}
															y={buildData[entity.id].y + 162}
															fromEntityId={entity.id}
															fromArrowTypeId={process.env.ARROW_TYPE_TRUE} />}
												</React.Fragment>
												: buildData[entity.id].last[0]
													? <React.Fragment>
														<Create
															x={buildData[entity.id].x}
															y={buildData[entity.id].y + 162}
															fromEntityId={entity.id}
															fromArrowTypeId={process.env.ARROW_TYPE_DEFAULT} />
													</React.Fragment>
													: <React.Fragment />}
											</React.Fragment>
											: <React.Fragment />}
									</React.Fragment>
									: <React.Fragment key={entity.id} />
							})
							: <React.Fragment />
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
