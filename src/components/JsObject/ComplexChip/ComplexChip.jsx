import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { StyledChip } from 'components/Input/LogicValue.jsx';
import { 
	all as allSourceTypes,
	SOURCE_TYPE_SCRIPT, 
} from 'structures/sourceTypes.js';
import onDelete from '../Remove/onRemove.js';

const BoxComplexSource = styled(Box)`
	display: inline-block;

	& > .MuiChip-root {
		overflow: hidden;
		position: relative !important;
		top: initial !important;
		left: initial !important;
		margin-top: -1px;
		margin-left: -1px;
	}
`;

let ComplexChip = ({
	scriptId,
	workspaceId,
	id,
	className,
	onMenuComplexValue,
}) => {
	const sourceTypeId = useSelector((state) => ((state.jsObject.data[id] || {}).collection || {}).source_type_id 
		?? ((state.jsObject.data[id] || {}).value || {}).source_type_id);
	const dataTypeId = useSelector((state) => ((state.jsObject.data[id] || {}).collection || {}).data_type_id 
		?? ((state.jsObject.data[id] || {}).value || {}).data_type_id);
	const sourceScriptEntityId = useSelector((state) => sourceTypeId === SOURCE_TYPE_SCRIPT.id
		? ((state.jsObject.data[id] || {}).value || {}).id
		: undefined);
	const nameText = useSelector((state) => sourceScriptEntityId > 0
		? (((state.script[workspaceId] || {}).data || {})[sourceScriptEntityId] || {}).name
		: undefined);
	const sourceText = React.useMemo(() => allSourceTypes[sourceTypeId].text(nameText), [
		sourceTypeId,
		nameText,
	]);
	const _onMenuComplexValue = React.useCallback((e) => onMenuComplexValue(e, id, dataTypeId, sourceTypeId), [
		onMenuComplexValue,
		id,
		dataTypeId,
		sourceTypeId,
	]);
	const _onDelete = React.useCallback((e) => onDelete(e, id), [
		id,
	]);

	return <BoxComplexSource 
		className={className}
		position="relative"
		pb="4px">
		<StyledChip 
			label={sourceText}
			onDelete={_onDelete}
			onClick={_onMenuComplexValue} />
	</BoxComplexSource>;
};

ComplexChip = React.memo(ComplexChip);
ComplexChip.defaultProps = {
	scriptId: 0,
	workspaceId: 0,
	onMenuComplexValue: () => {},
};

export default ComplexChip;
