import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { funcTemplates } from 'structures/funcTemplates.js';
import { getLang } from 'components/Language';

const _load = (funcTemplateId) => () => {
	switch (funcTemplateId) {
		case funcTemplates.FUNC_TEMPLATE_IF_COMPARE.id:
		default:
			return import('components/Dialog/Func/Props/IfBase');

		case funcTemplates.FUNC_TEMPLATE_IF_TYPE.id:
		case funcTemplates.FUNC_TEMPLATE_MATH_MAX.id:
		case funcTemplates.FUNC_TEMPLATE_MATH_MIN.id:
			return import('components/Dialog/Func/Props/IfType');

		case funcTemplates.FUNC_TEMPLATE_MATH_ROUND.id:
		case funcTemplates.FUNC_TEMPLATE_IF_PARITY.id:
		case funcTemplates.FUNC_TEMPLATE_IF_INTEGER.id:
		case funcTemplates.FUNC_TEMPLATE_MATH_INFINITY.id:
		case funcTemplates.FUNC_TEMPLATE_MATH_NAN.id:
			return import('components/Dialog/Func/Props/MathInt');

		case funcTemplates.FUNC_TEMPLATE_IF_NOT_NULL.id:
			return import('components/Dialog/Func/Props/IfNull');

		case funcTemplates.FUNC_TEMPLATE_IF_REG_EXP.id:
			return import('components/Dialog/Func/Props/IfRegExp');

		case funcTemplates.FUNC_TEMPLATE_TEXT_LENGTH.id:
		case funcTemplates.FUNC_TEMPLATE_TEXT_UPPERCASE.id:
		case funcTemplates.FUNC_TEMPLATE_TEXT_LOWERCASE.id:
		case funcTemplates.FUNC_TEMPLATE_TEXT_REVERSE.id:
		case funcTemplates.FUNC_TEMPLATE_HASH_BASE64_ENCODE.id:
		case funcTemplates.FUNC_TEMPLATE_HASH_BASE64_DECODE.id:
		case funcTemplates.FUNC_TEMPLATE_HASH_HASH.id:
			return import('components/Dialog/Func/Props/TextLength');

		case funcTemplates.FUNC_TEMPLATE_TEXT_SPLIT.id:
			return import('components/Dialog/Func/Props/TextSplit');

		case funcTemplates.FUNC_TEMPLATE_TEXT_FIND.id:
			return import('components/Dialog/Func/Props/TextFind');

		case funcTemplates.FUNC_TEMPLATE_TEXT_REPLACE.id:
			return import('components/Dialog/Func/Props/TextReplace');

		case funcTemplates.FUNC_TEMPLATE_MATH_COUNT.id:
			return import('components/Dialog/Func/Props/MathCount');

		case funcTemplates.FUNC_TEMPLATE_MATH_TRIG.id:
			return import('components/Dialog/Func/Props/MathTrigonometry');

		case funcTemplates.FUNC_TEMPLATE_MATH_LOG.id:
			return import('components/Dialog/Func/Props/MathLog');

		case funcTemplates.FUNC_TEMPLATE_ARR_GET.id:
		case funcTemplates.FUNC_TEMPLATE_ARR_DEL.id:
			return import('components/Dialog/Func/Props/ArrGet');

		case funcTemplates.FUNC_TEMPLATE_ARR_SET.id:
		case funcTemplates.FUNC_TEMPLATE_ARR_INDEX_OF.id:
		case funcTemplates.FUNC_TEMPLATE_TEXT_JOIN.id:
			return import('components/Dialog/Func/Props/ArrSet');

		case funcTemplates.FUNC_TEMPLATE_ARR_LENGTH.id:
		case funcTemplates.FUNC_TEMPLATE_ARR_REVERSE.id:
			return import('components/Dialog/Func/Props/ArrLength');

		case funcTemplates.FUNC_TEMPLATE_ARR_SPLICE.id:
			return import('components/Dialog/Func/Props/ArrSplice');

		case funcTemplates.FUNC_TEMPLATE_OBJ_GET.id:
		case funcTemplates.FUNC_TEMPLATE_OBJ_DEL.id:
			return import('components/Dialog/Func/Props/ObjGet');

		case funcTemplates.FUNC_TEMPLATE_OBJ_SET.id:
			return import('components/Dialog/Func/Props/ObjSet');

		case funcTemplates.FUNC_TEMPLATE_OBJ_LENGTH.id:
			return import('components/Dialog/Func/Props/ObjLength');

		case funcTemplates.FUNC_TEMPLATE_HASH_PASSWORD.id:
			return import('components/Dialog/Func/Props/HashPassword');

		case funcTemplates.FUNC_TEMPLATE_HASH_CRYPTO.id:
			return import('components/Dialog/Func/Props/HashCrypto');

		case funcTemplates.FUNC_TEMPLATE_DB_CREATE.id:
			return import('components/Dialog/Func/Props/DbCreate');

		case funcTemplates.FUNC_TEMPLATE_DB_DELETE.id:
			return import('components/Dialog/Func/Props/DbDelete');

		case funcTemplates.FUNC_TEMPLATE_DB_COLUMN_CREATE.id:
			return import('components/Dialog/Func/Props/ColumnCreate');

		case funcTemplates.FUNC_TEMPLATE_DB_COLUMN_DELETE.id:
			return import('components/Dialog/Func/Props/ColumnDelete');

		case funcTemplates.FUNC_TEMPLATE_DB_UPDATE.id:
			return import('components/Dialog/Func/Props/DbUpdate');

		case funcTemplates.FUNC_TEMPLATE_DB_COLUMN_UPDATE.id:
			return import('components/Dialog/Func/Props/ColumnUpdate');

		case funcTemplates.FUNC_TEMPLATE_DB_COUNT.id:
			return import('components/Dialog/Func/Props/DbCount');
	}
};

let Props = ({ 
	scriptId,
	workspaceId,
	funcId,
	categoryId,
	templateId,
}) => {
	const Component = React.lazy(_load(templateId));

	return <React.Fragment>
		<Box py={2}>
			<Typography variant="h6">
				{getLang('cmpDialogFuncPropsF')}
			</Typography>
		</Box>
		<React.Suspense fallback={<Typography>{getLang('cmpDialogFuncPropsWait')}</Typography>}>
			<Component 
				scriptId={scriptId}
				workspaceId={workspaceId}
				funcId={funcId}
				categoryId={categoryId}
				templateId={templateId} />
		</React.Suspense>
	</React.Fragment>;
};

Props = React.memo(Props);
Props.defaultProps = {
	scriptId: 0,
	workspaceId: 0,
	funcId: 0,
	categoryId: 0,
	templateId: 0,
};

export default Props;
