import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import SelectFuncType from 'components/Select/FuncType';
import SelectFuncTemplate from 'components/Select/FuncTemplate';
import GroupFunc from 'components/Group/Func';
import InputText from 'components/Input/Text';
import onSelectFuncType from './onSelectFuncType.js';
import onSelectFuncTemplate from './onSelectFuncTemplate.js';
import onChangeName from './onChangeName.js';

let Func = () => {
	const id = useSelector((state) => (state.func || {}).id);
	const name = useSelector((state) => (state.func || {}).name || '');
	const typeId = useSelector((state) => (state.func || {}).type_id || '');
	const funcTemplateId = useSelector((state) => (state.func || {}).func_template_id || '');

	return <React.Fragment>
		<Box py={2}>
			<InputText 
				required
				name="name"
				label="Название"
				value={name}
				onChange={onChangeName} />
		</Box>
		<Box py={2}>
			<SelectFuncType
				required 
				onSelect={onSelectFuncType}
				value={typeId} />
		</Box>
		{typeId > 0
			? <Box py={2}>
				<SelectFuncTemplate 
					required
					typeId={typeId}
					value={funcTemplateId}
					onSelect={onSelectFuncTemplate} />
			</Box>
			: <React.Fragment />}
		{funcTemplateId > 0
			? <Box py={2}>
				<GroupFunc 
					funcTemplateId={funcTemplateId}
					id={id} />
			</Box>
			: <React.Fragment />}
	</React.Fragment>;
};

Func = React.memo(Func);
Func.defaultProps = {
};

export default Func;
