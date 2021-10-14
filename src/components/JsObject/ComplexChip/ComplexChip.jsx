import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { StyledChip } from 'components/Input/LogicValue.jsx';
import source from 'structures/source.js';
import onDelete from '../Remove/onRemove.js';
import onChange from './onChange.js';

const BoxComplexSource = styled(Box)`
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
	id,
	className,
}) => {
	const sourceId = useSelector((state) => ((state.jsObject.data[id] || {}).collection || {}).source_id ?? ((state.jsObject.data[id] || {}).value || {}).source_id);
	const sourceText = React.useMemo(() => source[sourceId].text(), [
		sourceId,
	]);
	const _onChange = React.useCallback((e) => onChange(e, id, sourceId), [
		id,
		sourceId,
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
			onClick={_onChange} />
	</BoxComplexSource>;
};

ComplexChip = React.memo(ComplexChip);
ComplexChip.defaultProps = {
};

export default ComplexChip;
