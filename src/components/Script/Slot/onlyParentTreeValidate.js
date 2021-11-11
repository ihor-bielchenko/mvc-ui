import Store from 'components/Store';

const recursiveArrayBuilding = (entityId, arrows, collector = []) => {
	const prevArrow = arrows.find((arrow) => arrow.to_entity_id === entityId);

	if ((prevArrow || {}).from_entity_id > 0) {
		collector.push(prevArrow.from_entity_id);
		recursiveArrayBuilding(prevArrow.from_entity_id, arrows, collector);
	}
	return collector;
};

const onlyParentTreeValidate = (entityId, workspaceId) => {
	const script = Store().getState().script;
	return recursiveArrayBuilding(entityId, script[workspaceId].arrows);
};

export default onlyParentTreeValidate;
