import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Xarrow from 'react-xarrows';
import Typography from '@material-ui/core/Typography';

const TypographyLabel = styled(Typography)`
	background-color: #FFF;
`;

let Arrow = ({
	scriptId,
	id,
	fromEntityId,
	toEntityId,
	arrowTypeId,
}) => {
	return <React.Fragment>
		<Xarrow
			start={arrowTypeId === process.env.ARROW_TYPE_TRUE
				? 'true-'+ scriptId +'-'+ fromEntityId.toString()
				: arrowTypeId === process.env.ARROW_TYPE_FALSE
					? 'false-'+ scriptId +'-'+ fromEntityId.toString()
					: 'default-'+ scriptId +'-'+ fromEntityId.toString()}
			end={'to-'+ scriptId +'-'+ toEntityId.toString()}
			path="straight"
			strokeWidth={4}
			color={arrowTypeId === process.env.ARROW_TYPE_TRUE
				? '#4caf50'
				: arrowTypeId === process.env.ARROW_TYPE_FALSE
					? '#f44336'
					: '#616161'}
			label={{
				middle: arrowTypeId === process.env.ARROW_TYPE_TRUE
					? <TypographyLabel style={{ color: '#4caf50' }}>
						<b>TRUE</b>
					</TypographyLabel>
					: arrowTypeId === process.env.ARROW_TYPE_FALSE
						? <TypographyLabel style={{ color: '#f44336' }}>
							<b>FALSE</b>
						</TypographyLabel>
						: <React.Fragment />
			}} />
	</React.Fragment>;
};
Arrow = React.memo(Arrow);
Arrow.defaultProps = {
	scriptId: 0,
	id: 0,
	fromEntityId: 0,
	toEntityId: 0,
	arrowTypeId: process.env.ARROW_TYPE_DEFAULT,
};

let Arrows = ({ scriptId }) => {
	const arrows = useSelector((state) => state.script[scriptId].arrows);

	return <React.Fragment>
		{arrows.map((arrow, i) => {
			return <Arrow 
				key={arrow.id}
				scriptId={scriptId}
				id={arrow.id}
				fromEntityId={arrow.from_entity_id}
				toEntityId={arrow.to_entity_id}
				arrowTypeId={arrow.arrow_type_id} />;
		})}
	</React.Fragment>;
};

Arrows = React.memo(Arrows);
Arrows.defaultProps = {
	scriptId: 0,
};

export default Arrows;
