import React from 'react';
import styled from 'styled-components';
// import { useSelector } from 'react-redux';
import Xarrow from 'react-xarrows';
import Typography from '@material-ui/core/Typography';

export const TypographyLabel = styled(Typography)`
	background-color: #FFF;
`;

let Arrow = ({
	scriptId,
	workspaceId,
	id,
	fromEntityId,
	toEntityId,
	arrowTypeId,
}) => {
	const [ loaded, setLoaded ] = React.useState(() => false);

	React.useEffect(() => {
		setTimeout(() => setLoaded(true), 0);
	}, [
		setLoaded,
	]);

	return loaded && fromEntityId > 0
		? <React.Fragment>
			<Xarrow
				start={arrowTypeId === process.env.ARROW_TYPE_TRUE
					? 'true-'+ workspaceId +'-'+ fromEntityId.toString()
					: arrowTypeId === process.env.ARROW_TYPE_FALSE
						? 'false-'+ workspaceId +'-'+ fromEntityId.toString()
						: 'default-'+ workspaceId +'-'+ fromEntityId.toString()}
				end={'to-'+ workspaceId +'-'+ toEntityId.toString()}
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
		</React.Fragment>
		: <React.Fragment />;
};
Arrow = React.memo(Arrow);
Arrow.defaultProps = {
	scriptId: 0,
	workspaceId: 0,
	id: 0,
	fromEntityId: 0,
	toEntityId: 0,
	arrowTypeId: process.env.ARROW_TYPE_DEFAULT,
};

export default Arrow;
