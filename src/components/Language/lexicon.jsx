import React from 'react';
import { useSelector } from 'react-redux';
import Store from 'components/Store';

let _LexiconStorage = {};
let key = '';

let LangNode = ({ name }) => {
	const cultureKey = useSelector((state) => state.config.cultureKey);

	// onUpdate
	React.useEffect(() => {}, [ cultureKey ]);

	return <React.Fragment>
		{_LexiconStorage[name] || name}
	</React.Fragment>;
};
LangNode = React.memo(LangNode);
LangNode.defaultProps = {
};

export const _load = async (langKey = 'ru', callback = () => {}) => {
	const config = Store().getState().config;

	if (config.cultureKey !== langKey || Object.keys(_LexiconStorage).length === 0) {
		_LexiconStorage = (await import ('./langs/'+ langKey +'/index.js')).default();
		setTimeout(() => {
			config.cultureKey = langKey;
			Store().dispatch({
				type: 'config',
				payload: () => config,
			});
			callback();
		}, 0);
		return _LexiconStorage;
	}
};
export const getKey = () => key;

export const getLang = (name) => <LangNode name={name} />;
