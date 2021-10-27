import React from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

let Slot = ({
	withControl,
	backgroundColor,
	children,
}) => {
	return <React.Fragment>
		<Box 
			position="relative"
			display="flex"
			alignItems="flex-start"
			width={withControl
				? 252
				: 228}
			minHeight="70px"
			maxHeight="120px"
			mx="auto"
			py="24px">
			<Box
				position="relative"
				overflow="hidden"
				width="228px"
				minHeight="70px"
				maxHeight="120px"
				border="3px solid #78909C"
				style={{
					backgroundColor,
				}}>
				{children}
			</Box>
			{withControl
				? <React.Fragment>
					<IconButton size="small">
						<MoreVertIcon />
					</IconButton>
				</React.Fragment>
				: <React.Fragment />}
		</Box>
	</React.Fragment>;
};

Slot = React.memo(Slot);
Slot.defaultProps = {
	withControl: false,
	backgroundColor: 'inherit',
};

export default Slot;
