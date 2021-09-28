import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { StyledChip } from 'components/Input/LogicValue.jsx';
import source, {
	SOURCE_DB,
	SOURCE_PROXY_PASS,
} from 'structures/source.js';
import onChangeSourceDb from './onChangeSourceDb.js';
import onDeleteSourceDb from './onDeleteSourceDb.js';

const complexSources = {
	[SOURCE_DB.id]: {
		onChange: (id) => (e) => onChangeSourceDb(e, id),
		onDelete: (id) => (e) => onDeleteSourceDb(e, id),
	},
	[SOURCE_PROXY_PASS.id]: {
		onChange: () => (e) => {},
		onDelete: () => (e) => {},
	},
};

const BoxComplexSource = styled(Box)`
	& > .MuiChip-root {
		position: static !important;
		top: initial !important;
		left: initial !important;
	}
`;

let ComplexSource = ({ id }) => {
	const sourceId = useSelector((state) => (state.jsObject.data[id].source || {}).source_id);

	return sourceId > 0
		? <BoxComplexSource 
			position="relative"
			display="inline-block">
			<StyledChip 
				label={source[sourceId].text()}
				onDelete={complexSources[sourceId].onDelete(id)}
				onClick={complexSources[sourceId].onChange(id)} />
		</BoxComplexSource>
		: <React.Fragment />;
};
ComplexSource = React.memo(ComplexSource);
ComplexSource.defaultProps = {
	id: 0,
};

export default ComplexSource;
