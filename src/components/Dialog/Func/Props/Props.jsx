import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { funcTemplates } from 'structures/funcTemplates.js';

const _load = (funcTemplateId) => () => {
	switch (funcTemplateId) {
		case funcTemplates.FUNC_TEMPLATE_IF_COMPARE.id:
		default:
			return import('components/Dialog/Func/Props/IfBase');

		case funcTemplates.FUNC_TEMPLATE_IF_TYPE.id:
			return import('components/Dialog/Func/Props/IfType');

		// case funcTemplates.FUNC_TEMPLATE_IF_INTEGER.id:
		// case funcTemplates.FUNC_TEMPLATE_MATH_PARITY.id:
		// case funcTemplates.FUNC_TEMPLATE_MATH_INTEGER.id:
		// case funcTemplates.FUNC_TEMPLATE_MATH_INFINITY.id:
		// case funcTemplates.FUNC_TEMPLATE_MATH_ROUND.id:
		//	return import('components/Dialog/Func/Props/IfInt');

		case funcTemplates.FUNC_TEMPLATE_IF_NOT_NULL.id:
		case funcTemplates.FUNC_TEMPLATE_IF_PARITY.id:
		case funcTemplates.FUNC_TEMPLATE_IF_INTEGER.id:
		case funcTemplates.FUNC_TEMPLATE_MATH_INFINITY.id:
		case funcTemplates.FUNC_TEMPLATE_MATH_NAN.id:
		// case funcTemplates.FUNC_TEMPLATE_TEXT_TYPE.id:
		// case funcTemplates.FUNC_TEMPLATE_TEXT_NOT_NULL.id:
		// case funcTemplates.FUNC_TEMPLATE_MATH_TYPE.id:
			return import('components/Dialog/Func/Props/IfNull');

		case funcTemplates.FUNC_TEMPLATE_IF_REG_EXP.id:
			return import('components/Dialog/Func/Props/IfRegExp');

		// case funcTemplates.FUNC_TEMPLATE_TEXT_LENGTH.id:
		// case funcTemplates.FUNC_TEMPLATE_TEXT_UPPERCASE.id:
		// case funcTemplates.FUNC_TEMPLATE_TEXT_LOWERCASE.id:
		// case funcTemplates.FUNC_TEMPLATE_TEXT_REVERSE.id:
		// case funcTemplates.FUNC_TEMPLATE_HASH_BASE64.id:
		// case funcTemplates.FUNC_TEMPLATE_HASH_HASH.id:
		// 	return import('components/Dialog/Func/Props/TextBase');

		// case funcTemplates.FUNC_TEMPLATE_TEXT_SPLIT.id:
		// 	return import('components/Dialog/Func/Props/TextSplit');

		// case funcTemplates.FUNC_TEMPLATE_TEXT_FIND.id:
		// 	return import('components/Dialog/Func/Props/TextFind');

		// case funcTemplates.FUNC_TEMPLATE_TEXT_REPLACE.id:
		// 	return import('components/Dialog/Func/Props/TextReplace');

		// case funcTemplates.FUNC_TEMPLATE_TEXT_JOIN.id:
		// 	return import('components/Dialog/Func/Props/TextJoin');

		// case funcTemplates.FUNC_TEMPLATE_DB_CREATE.id:
		// 	return import('components/Dialog/Func/Props/DbCreate');

		// case funcTemplates.FUNC_TEMPLATE_DB_COPY.id:
		// 	return import('components/Dialog/Func/Props/DbCopy');

		// case funcTemplates.FUNC_TEMPLATE_DB_DELETE.id:
		// 	return import('components/Dialog/Func/Props/DbDelete');

		// case funcTemplates.FUNC_TEMPLATE_DB_COLUMN_CREATE.id:
		// 	return import('components/Dialog/Func/Props/DbColumnCreate');

		// case funcTemplates.FUNC_TEMPLATE_DB_COLUMN_DELETE.id:
		// 	return import('components/Dialog/Func/Props/DbColumnDelete');

		// case funcTemplates.FUNC_TEMPLATE_MATH_COUNT.id:
		// 	return import('components/Dialog/Func/Props/MathCount');

		// case funcTemplates.FUNC_TEMPLATE_MATH_MAX.id:
		// case funcTemplates.FUNC_TEMPLATE_MATH_MIN.id:
		// 	return import('components/Dialog/Func/Props/MathMinMax');

		// case funcTemplates.FUNC_TEMPLATE_MATH_TRIG.id:
		// 	return import('components/Dialog/Func/Props/MathTrigonometry');

		// case funcTemplates.FUNC_TEMPLATE_MATH_LOG.id:
		// 	return import('components/Dialog/Func/Props/MathLog');

		// case funcTemplates.FUNC_TEMPLATE_MATH_SYSTEM.id:
		// 	return import('components/Dialog/Func/Props/MathSystem');

		// case funcTemplates.FUNC_TEMPLATE_HASH_PASSWORD.id:
		// 	return import('components/Dialog/Func/Props/HashPassword');

		// case funcTemplates.FUNC_TEMPLATE_HASH_CRYPTO.id:
		// 	return import('components/Dialog/Func/Props/HashCrypto');

		// case funcTemplates.FUNC_TEMPLATE_SERVER_HTTP.id:
		// 	return import('components/Dialog/Func/Props/ServerHttp');
	}
};

let Props = ({ 
	scriptId,
	workspaceId,
	funcId,
	templateId,
}) => {
	const Component = React.lazy(_load(templateId));

	return <React.Fragment>
		<Box py={2}>
			<Typography variant="h6">
				Параметры функции:
			</Typography>
		</Box>
		<React.Suspense fallback={<Typography>Подождите...</Typography>}>
			<Component 
				scriptId={scriptId}
				workspaceId={workspaceId}
				funcId={funcId}
				templateId={templateId} />
		</React.Suspense>
	</React.Fragment>;
};

Props = React.memo(Props);
Props.defaultProps = {
	scriptId: 0,
	workspaceId: 0,
	funcId: 0,
	templateId: 0,
};

export default Props;
