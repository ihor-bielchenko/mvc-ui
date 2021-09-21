import CodeIcon from '@material-ui/icons/Code';

export const SERVER_HTTP = {
	id: process.env.SERVER_HTTP,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_ARR,
	icon: CodeIcon,
	color: 'primary',
	text: () => 'HTTP запрос',
	subtext: () => 'Отправка и получение данных по HTTP',
};

const funcServer = {
	[process.env.SERVER_HTTP]: SERVER_HTTP,
};

export default funcServer;