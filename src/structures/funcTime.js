import CodeIcon from '@material-ui/icons/Code';

export const TIME_FORMAT = {
	id: process.env.TIME_FORMAT,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_STR,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Форматирование даты',
	subtext: () => 'Перевод времени из одного формата в другой',
};
export const TIME_UPDATE = {
	id: process.env.TIME_UPDATE,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_STR,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Изменение значение',
	subtext: () => 'Добавить или отнять время от заданной даты',
};
export const TIME_ZONE = {
	id: process.env.TIME_ZONE,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_STR,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'Часовой пояс',
	subtext: () => 'Информации о временной зоне заданной даты',
};

const funcTime = {
	[process.env.TIME_FORMAT]: TIME_FORMAT,
	[process.env.TIME_UPDATE]: TIME_UPDATE,
	[process.env.TIME_ZONE]: TIME_ZONE,
};

export default funcTime;
