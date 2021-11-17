import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Draggable from 'react-draggable';
import Box from '@material-ui/core/Box';
import onStop from './onStop.js';

const BoxWrapper = styled(Box)`
	background-color: #FFF;
	border: 1px solid #9B9B9B;
	border-radius: 7px;

	& tr:first-child {
		border-top: 1px solid rgba(224, 224, 224, 1);
	}

	& td {
		padding: 2px 2px 0px;
	}
	& td:not(:last-child) {
		border-right: 1px solid rgba(224, 224, 224, 1);
	}
`;

let Slot = ({ 
	id,
	children, 
}) => {
	const x = useSelector((state) => ((state.db.tables || {})[id] || {}).x);
	const y = useSelector((state) => ((state.db.tables || {})[id] || {}).y);
	const _onStop = React.useCallback((e, options) => onStop(e, options, id), [
		id,
	]);

	return <React.Fragment>
		<Draggable 
			onStop={_onStop}
			position={{
				x,
				y,
			}}>
			<BoxWrapper
				position="absolute"
				maxWidth="280px"
				width="max-content">
				{children}
			</BoxWrapper>
		</Draggable>
	</React.Fragment>;
};

Slot = React.memo(Slot);
Slot.defaultProps = {
	id: 0,
};

export default Slot;
