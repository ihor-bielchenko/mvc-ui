import CodeIcon from '@material-ui/icons/Code';

export const FUNC_ARR = {
	id: process.env.FUNC_ARR,
	entity_id: process.env.ENTITY_FUNC,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Выбрать значение',
	subtext: () => 'Выбрать одно значение из нескольких элементов',
};

const funcArr = {
	[process.env.FUNC_ARR]: FUNC_ARR,
};

export default funcArr;
