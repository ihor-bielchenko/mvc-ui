import React from 'react';
import Script from 'components/Script';
import Background from 'components/Script/Background';
import getScriptId from 'components/Script/getScriptId.js';

let PageScript = () => {
	return <Background
		position="relative"
		overflow="auto"
		width="100%"
		height="100%">
		<Script id={getScriptId()} />
	</Background>;
};

PageScript = React.memo(PageScript);
PageScript.defaultProps = {
};

export default PageScript;
