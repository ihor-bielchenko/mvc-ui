import React from 'react';
import Script from 'components/Script';
import getScriptId from 'components/Script/getScriptId.js';

let PageScript = () => {
	return <Script 
		withScroll
		scriptId={getScriptId()} />;
};

PageScript = React.memo(PageScript);
PageScript.defaultProps = {
};

export default PageScript;
