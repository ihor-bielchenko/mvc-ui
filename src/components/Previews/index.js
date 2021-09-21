import Prop from './Prop';
import Json from './Json';
import Func from './Func';
import Condition from './Condition';

const Previews = {
	[process.env.ENTITY_PROP]: Prop,
	[process.env.ENTITY_JSON]: Json,
	[process.env.ENTITY_FUNC]: Func,
	[process.env.ENTITY_CONDITION]: Condition,
};

export default Previews;
