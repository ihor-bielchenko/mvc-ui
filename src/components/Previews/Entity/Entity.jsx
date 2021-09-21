import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import Xarrow from 'react-xarrows';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ClassIcon from '@material-ui/icons/Class';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MenuEntity from 'components/Menu/Entity';
import onMenu from 'components/Menu/onMenu.js';
import onDialog from 'components/Dialog/onDialog.js';
import { DIALOG_DELETE_CONFIRM } from 'consts/dialog.js';
import onDragStart from './onDragStart.js';
import onDragStop from './onDragStop.js';
import onDragProcess from './onDragProcess.js';
import onArrow from './onArrow.js';
import onMouseOver from './onMouseOver.js';
import onMouseOut from './onMouseOut.js';
import onClick from './onClick.js';

const BoxChildrenWrapper = styled(Box)`
	text-transform: initial;
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
	text-align: left;
	& > svg.MuiSvgIcon-root {
		margin-right: 4px;
	}
	&.adding-arrow-process:hover {
		border: 4px solid rgb(3, 169, 244) !important;
		box-shadow: 0 0 10px rgba(3, 169, 244, 0.5) !important;
		cursor: pointer !important;
	}
`;
const DivAddingArrowMouse = styled.div`
	position: absolute;
	pointer-events: none;
	width: 1px;
	height: 1px;
`;
let Entity = ({ 
	scriptRenderId,
	id,
	StartIcon,
	color,
	backgroundColor, 
	children,
	isSource,
	asLabel,
	onClickEntity,
	onEdit,
	onDelete,
	formatValidating,
}) => {
	const addingArrowFromId = useSelector((state) => state.arrows.addingArrowFromId || 0);
	const addingArrowToId = useSelector((state) => state.arrows.addingArrowToId || 0);
	const addingArrowMouseX = useSelector((state) => state.arrows.addingArrowMouseX);
	const addingArrowMouseY = useSelector((state) => state.arrows.addingArrowMouseY);
	const existArrowIndex = useSelector((state) => state.arrows.data.findIndex((item) => item.from_entity_id === id));
	const typeId = useSelector((state) => state.entities.data[id].type_id);
	const formatId = useSelector((state) => state.entities.data[id].format_id);
	const dragFlag = useSelector((state) => state.entities.data[id].dragFlag);
	const x = useSelector((state) => state.entities.data[id].x);
	const y = useSelector((state) => state.entities.data[id].y);
	const formPropId = useSelector((state) => (state.prop || {}).id);
	const formFuncId = useSelector((state) => (state.func || {}).id);
	const _onDragProcess = React.useCallback((e, options) => onDragProcess(e, options, id), [
		id,
	]);
	const _onDragStop = React.useCallback((e, options) => onDragStop(e, options, id), [
		id,
	]);
	const _onArrow = React.useCallback((e) => onArrow(e, id), [
		id,
	]);
	const _onMouseOver = React.useCallback((e) => onMouseOver(e, id), [
		id,
	]);
	const _onClick = React.useCallback((e) => onClick(e, id), [
		id,
	]);
	const _onClickEntity = React.useCallback((e) => onClickEntity(e, typeId, id), [
		onClickEntity,
		typeId,
		id,
	]);
	const _formatValidating = formatValidating();
	const _nowFormatValidateFlag = _formatValidating.includes(formatId);
	const _formIdMatchEntityFlag = (formPropId === id || formFuncId === id);
	const _handlersFlag = (isSource && _nowFormatValidateFlag);

	return !asLabel
		? <React.Fragment>
			<Draggable 
				{ ...!isSource
					? {
						onStart: onDragStart,
						onStop: _onDragStop,
						onDrag: _onDragProcess,
					}
					: {
						disabled: true,
					} }
				position={{ 
					x, 
					y, 
				}}>
				<Box
					position="absolute"
					display="flex"
					alignItems="flex-start"
					justifyContent="space-between"
					width="240px"
					maxHeight="160px"
					align="left">
					<BoxChildrenWrapper
						p={1}
						width="100%"
						id={scriptRenderId +'-'+ id}
						className={(addingArrowFromId > 0 && addingArrowFromId !== id)
							? 'adding-arrow-process'
							: ''}
						style={{
							color,
							backgroundColor: ((isSource && !_nowFormatValidateFlag) || _formIdMatchEntityFlag)
								? '#BDBDBD'
								: backgroundColor,
							border: (y <= 50 && !dragFlag)
								? '4px solid #000'
								: '4px solid transparent',
							cursor: !isSource
								? 'grabbing'
								: 'pointer',
						}}
						{ ...(!_formIdMatchEntityFlag && _handlersFlag)
							? {
								onClick: _onClickEntity,
							}
							: {
								onMouseOver: _onMouseOver,
								onMouseOut: onMouseOut,
								onClick: _onClick,
							} }>
						<StartIcon />
						<div>
							{children}
						</div>
					</BoxChildrenWrapper>
					<Box minWidth="30px">
						{!dragFlag && !isSource
							? <React.Fragment>
								<IconButton 
									size="small"
									onClick={onMenu('menu-entity-'+ id)}>
									<MoreVertIcon fontSize="small" />
								</IconButton>
								<MenuEntity 
									aria={'menu-entity-'+ id}
									onEdit={onEdit}
									onDelete={onDialog(DIALOG_DELETE_CONFIRM, {
										onDelete,
									})} />
							</React.Fragment>
							: <React.Fragment />}
					</Box>
					{!dragFlag && 
						existArrowIndex === -1 && 
						!isSource
						? <Box
							position="absolute"
							zIndex="-1"
							top="98%"
							width="100%"
							height="26px"
							align="center">
							<IconButton 
								size="small"
								onClick={_onArrow}>
								<ArrowDownwardIcon fontSize="small" />
							</IconButton>
						</Box>
						: <React.Fragment />}
					{addingArrowFromId === id && 
						!addingArrowMouseX &&
						!addingArrowMouseY
						? <React.Fragment>
							<DivAddingArrowMouse 
								id="adding-arrow-mouse"
								style={{
									top: 'calc(100% + 24px)',
									left: '105px',
								}} />
							<Xarrow
								start={id.toString()}
								end="adding-arrow-mouse"
								color="#BDBDBD"
								path="grid"
								strokeWidth={3} />
						</React.Fragment>
						: <React.Fragment />}
				</Box>
			</Draggable>
			{addingArrowFromId === id &&
				addingArrowMouseX >= 0 &&
				addingArrowMouseY >= 0
				? <React.Fragment>
					<DivAddingArrowMouse 
						id="adding-arrow-mouse"
						style={{
							transform: `translate(${addingArrowMouseX}px,${addingArrowMouseY}px)`,
						}} />
					<Xarrow
						start={id.toString()}
						end={addingArrowToId > 0
							? addingArrowToId.toString()
							: 'adding-arrow-mouse'}
						color="#BDBDBD"
						path="grid"
						strokeWidth={3} />
				</React.Fragment>
				: <React.Fragment />}
		</React.Fragment>
		: <React.Fragment>
			<Box
				display="flex"
				alignItems="flex-start"
				justifyContent="space-between"
				width="210px"
				minWidth="210px"
				maxHeight="160px"
				align="left">
				<BoxChildrenWrapper
					p={1}
					width="100%"
					style={{
						color,
						backgroundColor: ((isSource && !_nowFormatValidateFlag) 
							|| formPropId === id 
							|| formFuncId === id)
							? '#BDBDBD'
							: backgroundColor,
						marginLeft: 2,
						marginRight: 2,
						cursor: !isSource
							? 'grabbing'
							: 'pointer',
					}}
					{ ...isSource && _nowFormatValidateFlag && formPropId !== id && formFuncId !== id
						? {
							onClick: _onClickEntity,
						}
						: {} }>
					<StartIcon />
					<div>
						{children}
					</div>
				</BoxChildrenWrapper>
			</Box>
		</React.Fragment>;
};

Entity = React.memo(Entity);
Entity.defaultProps = {
	id: 0,
	isSource: false,
	asLabel: false,
	onEdit: () => {},
	onDelete: () => {},
	onClickEntity: () => {},
	formatValidating: () => ([]),
	StartIcon: ClassIcon,
	color: '#FFF',
	backgroundColor: '#FF5252',
};

export default Entity;
