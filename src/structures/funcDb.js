import StorageIcon from '@material-ui/icons/Storage';
// import { getLang } from 'components/Language';

export const DB_CREATE = {
	id: process.env.DB_CREATE,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_BOOL,
	icon: StorageIcon,
	color: 'primary',
	text: () => 'Создать запись',
	subtext: () => 'Добавить в базу новые данные',
};
export const DB_COLUMN_CREATE = {
	id: process.env.DB_COLUMN_CREATE,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_BOOL,
	icon: StorageIcon,
	color: 'primary',
	text: () => 'Добавить поле',
	subtext: () => 'Добавить в базу новую колонку',
};
export const DB_COPY = {
	id: process.env.DB_COPY,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_BOOL,
	icon: StorageIcon,
	color: 'primary',
	text: () => 'Копировать',
	subtext: () => 'Копировать существующие данные в базе',
};
export const DB_DELETE = {
	id: process.env.DB_DELETE,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_BOOL,
	icon: StorageIcon,
	color: 'secondary',
	text: () => 'Удалить',
	subtext: () => 'Удалить данные из базы',
};
export const DB_COLUMN_DELETE = {
	id: process.env.DB_COLUMN_DELETE,
	entity_id: process.env.ENTITY_FUNC,
	format_id: process.env.FORMAT_BOOL,
	icon: StorageIcon,
	color: 'secondary',
	text: () => 'Удалить поле',
	subtext: () => 'Удалить поле из базы. Все данных из этой колонки будут потеряны',
};

const funcDb = {
	[process.env.DB_CREATE]: DB_CREATE,
	[process.env.DB_COPY]: DB_COPY,
	[process.env.DB_DELETE]: DB_DELETE,
	[process.env.DB_COLUMN_CREATE]: DB_COLUMN_CREATE,
	[process.env.DB_COLUMN_DELETE]: DB_COLUMN_DELETE,
};

export default funcDb;
