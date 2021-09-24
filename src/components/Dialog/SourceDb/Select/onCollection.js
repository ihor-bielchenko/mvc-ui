import Store from 'components/Store';
// import switchFormatId from './switchFormatId.js';

const onCollection = (e, id) => {
	let jsObject = Store().getState().jsObject;

	jsObject.tempValue['is_collection'] = !jsObject.tempValue['is_collection'];
	// jsObject = switchFormatId(id, jsObject);

	Store().dispatch({
		type: 'jsObject',
		payload: () => ({ ...jsObject }),
	});
};

export default onCollection;
