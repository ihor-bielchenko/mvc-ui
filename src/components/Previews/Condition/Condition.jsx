import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CodeIcon from '@material-ui/icons/Code';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import onDelete from 'components/Dialog/Prop/onDelete.js';
import { getLang } from 'components/Language';
import format from 'structures/format.js';
import Entity from '../Entity';
import onEdit from '../Func/onEdit.js';

let Condition = ({
	scriptRenderId, 
	id,
	isSource,
	onClickEntity,
	formatValidating,
}) => {
	const dragFlag = useSelector((state) => state.entities.data[id].dragFlag);
	const nameSubstr = useSelector((state) => state
		.entities
		.data[id]
		.name
		.substr(0, 65));
	const funcTemplateId = useSelector((state) => state
		.entities
		.data[id]
		.func
		.func_template_id);
	const formatId = useSelector((state) => state
		.entities
		.data[id]
		.format_id);
	const _onEdit = React.useCallback((e) => onEdit(e, id), [
		id,
	]);
	const _onDelete = React.useCallback((e) => onDelete(e, id), [
		id,
	]);

	return <Entity 
		scriptRenderId={scriptRenderId}
		id={id}
		isSource={isSource}
		onClickEntity={onClickEntity}
		onEdit={_onEdit}
		onDelete={_onDelete}
		formatValidating={formatValidating}
		StartIcon={CodeIcon}
		backgroundColor="#F4511E"
		color="#FFF">
		<Typography
			variant="caption"
			component="div"
			style={{ lineHeight: '8px' }}>
			{getLang(`LogicFunc${funcTemplateId}Name`)}
		</Typography>
		<Typography
			variant="caption"
			component="div">
			({format[formatId].text()})
		</Typography>
		<Typography 
			variant="body2"
			component="div">
			<b>
			{(nameSubstr.length >= 64 && nameSubstr[64] !== ' ')
				? <React.Fragment>
					{nameSubstr} ...
				</React.Fragment>
				: nameSubstr}
			</b>
		</Typography>
		{!dragFlag && !isSource
			? <Box
				display="flex"
				justifyContent="space-between"
				position="absolute"
				top="24px"
				left="-46px"
				width="calc(100% + 68px)">
				<IconButton 
					size="small"
					style={{ color: '#79B316' }}>
					<AddIcon />
				</IconButton>
				<IconButton 
					size="small"
					style={{ color: '#e53935' }}>
					<RemoveIcon />
				</IconButton>
			</Box>
			: <React.Fragment />}
	</Entity>;
};

Condition = React.memo(Condition);
Condition.defaultFuncs = {
	id: 0,
	isSource: false,
	formatValidating: () => ([]),
};

export default Condition;
