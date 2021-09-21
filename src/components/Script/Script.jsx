import React from 'react';
import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Xarrow from 'react-xarrows';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import previews from 'components/Previews';
import Actions from './Actions.jsx';
import BoxStart from './BoxStart.jsx';
import BoxGradient from './BoxGradient.jsx';
import onMouseMove from './onMouseMove.js';
import onClick from './onClick.js';
import onDeleteArrow from './onDeleteArrow.js';
import onMount from './onMount.js';

let Entities = ({ 
	scriptRenderId,
	isSource,
	onClickEntity,
	formatValidating,
}) => {
	const entitiesData = useSelector((state) => state.entities.data);

	return Object.keys(entitiesData).map((id) => {
		const Preview = previews[entitiesData[id].type_id];

		return <Preview 
			key={id}
			scriptRenderId={scriptRenderId}
			id={Number(id)}
			isSource={isSource}
			onClickEntity={onClickEntity}
			formatValidating={formatValidating} />;
	});
};
Entities = React.memo(Entities);
Entities.defaultProps = {
	scriptRenderId: 0,
	isSource: false,
	formatValidating: () => ([]),
};

let Arrow = ({  
	scriptRenderId,
	id,
	fromEntityId,
	toEntityId,
	typeId,
	isSource,
}) => {
	useSelector((state) => state.entities.data[fromEntityId].x);
	useSelector((state) => state.entities.data[fromEntityId].y);
	useSelector((state) => state.entities.data[toEntityId].x);
	useSelector((state) => state.entities.data[toEntityId].y);
	const _onDeleteArrow = React.useCallback((e) => onDeleteArrow(e, id), [
		id,
	]);

	return <Xarrow
		start={scriptRenderId +'-'+ fromEntityId.toString()}
		end={scriptRenderId +'-'+ toEntityId.toString()}
		path="grid"
		strokeWidth={4}
		color="#616161"
		label={{
			middle: !isSource && typeId === process.env.ARROW_BASE
				? <IconButton
					size="small"
					color="secondary"
					onClick={_onDeleteArrow}>
					<CloseIcon fontSize="small" />
				</IconButton>
				: <React.Fragment />
		}} />;
};
Arrow = React.memo(Arrow);
Arrow.defaultProps = {
	scriptRenderId: 0,
	id: 0,
	fromEntityId: 0,
	toEntityId: 0,
	typeId: 0,
	isSource: false,
};

let Arrows = ({ 
	scriptRenderId,
	isSource, 
}) => {
	const arrowsData = useSelector((state) => state.arrows.data);

	return arrowsData.map((arrow) => {
		return <Arrow 
			key={arrow.id}
			scriptRenderId={scriptRenderId}
			id={arrow.id}
			fromEntityId={arrow.from_entity_id}
			toEntityId={arrow.to_entity_id}
			typeId={arrow.type_id}
			isSource={isSource} />;
	});
};
Arrows = React.memo(Arrows);
Arrows.defaultProps = {
	scriptRenderId: 0,
	isSource: false,
};

let Script = ({ 
	scriptId, 
	isSource,
	withScroll,
	onClickEntity,
	formatValidating,
}) => {
	const issetEntities = useSelector((state) => Object.keys((state.entities || {}).data || {}).length > 0);
	const scriptRenderId = React.useMemo(() => Date.now(), []);

	// onMount
	React.useEffect(() => {
		onMount(scriptId);
	}, [
		scriptId,
	]);

	return issetEntities
		? <React.Fragment>
			{!isSource
				? <Actions />
				: <React.Fragment />}
			<Box
				position="relative" 
				height={withScroll
					? 'calc(100% - 74px)'
					: 'calc(100% - 14px)'}
				onMouseMove={onMouseMove}
				onClick={onClick}
				style={{
					borderTop: '14px solid #FFF',
					marginLeft: '-1px',
				}}>
				<PerfectScrollbar>
					<BoxGradient />
					<BoxStart>
						Начало программы
					</BoxStart>
					<Box>
						<Entities 
							scriptRenderId={scriptRenderId}
							isSource={isSource}
							onClickEntity={onClickEntity}
							formatValidating={formatValidating} />
						<Arrows 
							scriptRenderId={scriptRenderId}
							isSource={isSource} />
					</Box>
				</PerfectScrollbar>
			</Box>
		</React.Fragment>
		: !isSource
			? <Actions emptyScript />
			: <Box 
				py={4}
				display="flex"
				justifyContent="center">
				<Typography 
					variant="h5"
					color="textSecondary">
					Программа пустая
				</Typography>
			</Box>;
};

Script = React.memo(Script);
Script.defaultProps = {
	scriptId: 0,
	isSource: false,
	withScroll: false,
	formatValidating: () => ([]),
};

export default Script;
