import Store from 'components/Store';
import onLoader from 'components/Loader/onLoader';
import build from './build.js';

const onMount = async (scriptId) => {
	onLoader(true);

	const _scriptId = scriptId;
	const script = Store().getState().script;
	const firstEntity = script[_scriptId].data.find((entity) => entity.as_start);
	
	if (firstEntity) {
		const buildData = await build(firstEntity.id, script[_scriptId].arrows);

		setTimeout(() => {
			const script = Store().getState().script;

			script[_scriptId]['buildData'] = buildData;
			Store().dispatch({
				type: 'script',
				payload: () => ({ ...script }),
			});
		}, 0);
	}
	onLoader(false);
};

export default onMount;
