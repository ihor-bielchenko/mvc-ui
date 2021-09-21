import React from 'react';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide
		{...props} 
		direction="up" 
		ref={ref} />;
});

export default Transition;
