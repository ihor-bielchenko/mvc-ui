import React from 'react';
import { _load } from './lexicon.jsx';

const Provider = React.memo(({ children }) => {
	const [ isLoad, setLoad ] = React.useState(false);

	// onMount
	React.useEffect(() => {
		window.addEventListener('onSwitchLang', (e) => (e.detail && _load(e.detail)));
	}, []);

	// onLoad
	React.useEffect(() => {
		!isLoad && (_load('ru', () => setLoad(true)));
	}, [ isLoad ]);

	return isLoad
		? children
		: <React.Fragment />;
});

export default Provider;