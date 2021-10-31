import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { funcTemplates } from 'structures/funcTemplates.js';

const _load = (funcTemplateId) => () => {
	switch (funcTemplateId) {
		case funcTemplates.FUNC_TEMPLATE_IF_COMPARE.id:
		default:
			return import('components/Group/Func/IfBase');

		case funcTemplates.FUNC_TEMPLATE_IF_TYPE.id:
			return import('components/Group/Func/IfType');

		// case funcTemplates.FUNC_TEMPLATE_IF_PARITY.id:
		// case funcTemplates.FUNC_TEMPLATE_IF_INTEGER.id:
		// case funcTemplates.FUNC_TEMPLATE_MATH_PARITY.id:
		// case funcTemplates.FUNC_TEMPLATE_MATH_INTEGER.id:
		// case funcTemplates.FUNC_TEMPLATE_MATH_INFINITY.id:
		// case funcTemplates.FUNC_TEMPLATE_MATH_ROUND.id:
		// 	return import('components/Group/Func/IfInt');

		// case funcTemplates.FUNC_TEMPLATE_IF_NOT_NULL.id:
		// case funcTemplates.FUNC_TEMPLATE_TEXT_TYPE.id:
		// case funcTemplates.FUNC_TEMPLATE_TEXT_NOT_NULL.id:
		// case funcTemplates.FUNC_TEMPLATE_MATH_TYPE.id:
		// 	return import('components/Group/Func/IfLogic');

		// case funcTemplates.FUNC_TEMPLATE_TEXT_REG_EXP.id:
		// case funcTemplates.FUNC_TEMPLATE_IF_REG_EXP.id:
		// 	return import('components/Group/Func/IfRegExp');

		// case funcTemplates.FUNC_TEMPLATE_TEXT_LENGTH.id:
		// case funcTemplates.FUNC_TEMPLATE_TEXT_UPPERCASE.id:
		// case funcTemplates.FUNC_TEMPLATE_TEXT_LOWERCASE.id:
		// case funcTemplates.FUNC_TEMPLATE_TEXT_REVERSE.id:
		// case funcTemplates.FUNC_TEMPLATE_HASH_BASE64.id:
		// case funcTemplates.FUNC_TEMPLATE_HASH_HASH.id:
		// 	return import('components/Group/Func/TextBase');

		// case funcTemplates.FUNC_TEMPLATE_TEXT_SPLIT.id:
		// 	return import('components/Group/Func/TextSplit');

		// case funcTemplates.FUNC_TEMPLATE_TEXT_FIND.id:
		// 	return import('components/Group/Func/TextFind');

		// case funcTemplates.FUNC_TEMPLATE_TEXT_REPLACE.id:
		// 	return import('components/Group/Func/TextReplace');

		// case funcTemplates.FUNC_TEMPLATE_TEXT_JOIN.id:
		// 	return import('components/Group/Func/TextJoin');

		// case funcTemplates.FUNC_TEMPLATE_DB_CREATE.id:
		// 	return import('components/Group/Func/DbCreate');

		// case funcTemplates.FUNC_TEMPLATE_DB_COPY.id:
		// 	return import('components/Group/Func/DbCopy');

		// case funcTemplates.FUNC_TEMPLATE_DB_DELETE.id:
		// 	return import('components/Group/Func/DbDelete');

		// case funcTemplates.FUNC_TEMPLATE_DB_COLUMN_CREATE.id:
		// 	return import('components/Group/Func/DbColumnCreate');

		// case funcTemplates.FUNC_TEMPLATE_DB_COLUMN_DELETE.id:
		// 	return import('components/Group/Func/DbColumnDelete');

		// case funcTemplates.FUNC_TEMPLATE_MATH_COUNT.id:
		// 	return import('components/Group/Func/MathCount');

		// case funcTemplates.FUNC_TEMPLATE_MATH_MAX.id:
		// case funcTemplates.FUNC_TEMPLATE_MATH_MIN.id:
		// 	return import('components/Group/Func/MathMinMax');

		// case funcTemplates.FUNC_TEMPLATE_MATH_TRIG.id:
		// 	return import('components/Group/Func/MathTrigonometry');

		// case funcTemplates.FUNC_TEMPLATE_MATH_LOG.id:
		// 	return import('components/Group/Func/MathLog');

		// case funcTemplates.FUNC_TEMPLATE_MATH_SYSTEM.id:
		// 	return import('components/Group/Func/MathSystem');

		// case funcTemplates.FUNC_TEMPLATE_HASH_PASSWORD.id:
		// 	return import('components/Group/Func/HashPassword');

		// case funcTemplates.FUNC_TEMPLATE_HASH_CRYPTO.id:
		// 	return import('components/Group/Func/HashCrypto');

		// case funcTemplates.FUNC_TEMPLATE_SERVER_HTTP.id:
		// 	return import('components/Group/Func/ServerHttp');
	}
};

let Func = ({ 
	templateId,
	id,
}) => {
	const Component = React.lazy(_load(templateId));

	return <React.Fragment>
		<Box py={2}>
			<Typography variant="h6">
				Параметры функции:
			</Typography>
		</Box>
		<React.Suspense fallback={<Typography>Подождите...</Typography>}>
			<Component id={id} />
		</React.Suspense>
	</React.Fragment>;
};

Func = React.memo(Func);
Func.defaultProps = {
	templateId: 0,
};

export default Func;
