import Store from 'components/Store';
// import switchFormatId from './switchFormatId.js';

const onCollection = (defaultValue) => {
	let jsObject = Store().getState().jsObject;

	jsObject.tempValue['is_collection'] = typeof defaultValue === 'boolean'
		? defaultValue
		: !jsObject.tempValue['is_collection'];
	// jsObject = switchFormatId(id, jsObject);

	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onCollection;
