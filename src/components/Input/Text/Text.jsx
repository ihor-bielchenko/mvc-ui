import React from 'react';
import Input from '../Input.jsx';

let Text = (props) => {
	return <Input 
		{ ...props } 
		type="text" />;
};

Text = React.memo(Text);
Text.defaultProps = {
};

export default Text;