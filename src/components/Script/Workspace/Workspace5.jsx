import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { FUNC_CATEGORY_IF } from 'structures/funcCategories.js';
import funcTemplates from 'structures/funcTemplates.js';
import {
	// Create,
	entities,
} from '../Slot';

const BoxBackgraund = styled(Box)`
	background-image: linear-gradient(rgba(198, 198, 198, .2) .1em, transparent .1em), linear-gradient(90deg, rgba(198, 198, 198, .2) .1em, transparent .1em);
	background-size: 20px 20px;
`;

let Listing = ({ id }) => {
	const data = useSelector((state) => state.script[id].data);
	// const arrows = useSelector((state) => state.script[id].arrows);

	return <React.Fragment>
		<Box width="max-content">
			{data.length > 0
				? <Box 
					position="relative"
					minWidth="420px"
					py="34px">
					{data.map((entity, i) => {
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
						// console.log('findArrows', findArrows);

						return SlotEntiy
							? _slotName === 'Condition'
								? <Box 
									position="relative"
									minWidth="420px"
									py="34px">
									<SlotEntiy 
										scriptId={id}
										entityId={entity.id}
										id={_id}
										index={i} />
									<Box
										position="relative"
										display="flex"
										alignItems="flex-start"
										justifyContent="center">
										<Box
											position="relative"
											minWidth="420px"
											py="34px">
										</Box>
										<Box
											position="relative"
											minWidth="420px"
											py="34px">
										</Box>
									</Box>
								</Box>
								: <SlotEntiy 
									scriptId={id}
									entityId={entity.id}
									id={_id}
									index={i} />
							: <React.Fragment />;
					})}
				</Box>
				: <React.Fragment />}
			<Box 
				position="relative"
				minWidth="420px"
				py="34px">
				<Box
					width="170px"
					height="100px"
					style={{
						backgroundColor: 'red',
						margin: '0 auto',
					}} />
				<Box
					position="relative"
					display="flex"
					alignItems="flex-start"
					justifyContent="center">
					<Box
						position="relative"
						minWidth="420px"
						py="34px">
						<Box
							width="170px"
							height="100px"
							style={{
								backgroundColor: 'red',
								margin: '0 auto',
							}} />
						<Box
							position="relative"
							display="flex"
							alignItems="flex-start"
							justifyContent="center">
							<Box
								position="relative"
								minWidth="420px"
								py="34px">
								<Box
									width="170px"
									height="100px"
									style={{
										backgroundColor: 'red',
										margin: '0 auto',
									}} />
							</Box>
							<Box
								position="relative"
								minWidth="420px"
								py="34px">
								<Box
									width="170px"
									height="100px"
									style={{
										backgroundColor: 'green',
										margin: '0 auto',
									}} />
							</Box>
						</Box>
					</Box>
					<Box
						position="relative"
						minWidth="420px"
						py="34px">
						<Box
							width="170px"
							height="100px"
							style={{
								backgroundColor: 'green',
								margin: '0 auto',
							}} />
						<Box
							position="relative"
							display="flex"
							alignItems="flex-start"
							justifyContent="center">
							<Box
								position="relative"
								minWidth="420px"
								py="34px">
								<Box
									width="170px"
									height="100px"
									style={{
										backgroundColor: 'green',
										margin: '0 auto',
									}} />
								<Box
									position="relative"
									display="flex"
									alignItems="flex-start"
									justifyContent="center">
									<Box
										position="relative"
										minWidth="420px"
										py="34px">
									</Box>
									<Box
										position="relative"
										minWidth="420px"
										py="34px">
										<Box
											width="170px"
											height="100px"
											style={{
												backgroundColor: 'green',
												margin: '0 auto',
											}} />
									</Box>
								</Box>
							</Box>
							<Box
								position="relative"
								minWidth="420px"
								py="34px">
								<Box
									width="170px"
									height="100px"
									style={{
										backgroundColor: 'green',
										margin: '0 auto',
									}} />
								<Box
									position="relative"
									display="flex"
									alignItems="flex-start"
									justifyContent="center">
									<Box
										position="relative"
										minWidth="420px"
										py="34px">
									</Box>
									<Box
										position="relative"
										minWidth="420px"
										py="34px">
										<Box
											width="170px"
											height="100px"
											style={{
												backgroundColor: 'green',
												margin: '0 auto',
											}} />
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
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
