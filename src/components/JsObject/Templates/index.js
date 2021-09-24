import {
	COLUMN_TEXT,
	COLUMN_NUMBER,
	COLUMN_BOOLEAN,
	COLUMN_OBJ,
	COLUMN_ARR,
	COLUMN_NULL,
} from 'structures/columnTypes.js';
import ItemStr from './ItemStr.jsx';
import ItemNum from './ItemNum.jsx';
import ItemBool from './ItemBool.jsx';
import ItemObj from './ItemObj.jsx';
import ItemArr from './ItemArr.jsx';
import ItemNull from './ItemNull.jsx';

const templates = {
	[COLUMN_TEXT.id]: ItemStr,
	[COLUMN_NUMBER.id]: ItemNum,
	[COLUMN_BOOLEAN.id]: ItemBool,
	[COLUMN_OBJ.id]: ItemObj,
	[COLUMN_ARR.id]: ItemArr,
	[COLUMN_NULL.id]: ItemNull,
};

export default templates;
