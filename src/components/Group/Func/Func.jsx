import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import * as funcIf from 'structures/funcIf.js';
import * as funcText from 'structures/funcText.js';
import * as funcMaths from 'structures/funcMaths.js';
import * as funcDb from 'structures/funcDb.js';
import * as funcHash from 'structures/funcHash.js';
import * as funcServer from 'structures/funcServer.js';

const _load = (funcTemplateId) => () => {
	switch (funcTemplateId) {
		case funcIf.IF_COMPARE.id:
		default:
			return import('components/Group/Func/IfBase');

		case funcIf.IF_TYPE.id:
			return import('components/Group/Func/IfType');

		case funcIf.IF_PARITY.id:
		case funcIf.IF_INTEGER.id:
		case funcMaths.MATH_PARITY.id:
		case funcMaths.MATH_INTEGER.id:
		case funcMaths.MATH_INFINITY.id:
		case funcMaths.MATH_ROUND.id:
			return import('components/Group/Func/IfInt');

		case funcIf.IF_NOT_NULL.id:
		case funcText.TEXT_TYPE.id:
		case funcText.TEXT_NOT_NULL.id:
		case funcMaths.MATH_TYPE.id:
			return import('components/Group/Func/IfLogic');

		case funcText.TEXT_REG_EXP.id:
		case funcIf.IF_REG_EXP.id:
			return import('components/Group/Func/IfRegExp');

		case funcText.TEXT_LENGTH.id:
		case funcText.TEXT_UPPERCASE.id:
		case funcText.TEXT_LOWERCASE.id:
		case funcText.TEXT_REVERSE.id:
		case funcHash.HASH_BASE64.id:
		case funcHash.HASH_HASH.id:
			return import('components/Group/Func/TextBase');

		case funcText.TEXT_SPLIT.id:
			return import('components/Group/Func/TextSplit');

		case funcText.TEXT_FIND.id:
			return import('components/Group/Func/TextFind');

		case funcText.TEXT_REPLACE.id:
			return import('components/Group/Func/TextReplace');

		case funcText.TEXT_JOIN.id:
			return import('components/Group/Func/TextJoin');

		case funcDb.DB_CREATE.id:
			return import('components/Group/Func/DbCreate');

		case funcDb.DB_COPY.id:
			return import('components/Group/Func/DbCopy');

		case funcDb.DB_DELETE.id:
			return import('components/Group/Func/DbDelete');

		case funcDb.DB_COLUMN_CREATE.id:
			return import('components/Group/Func/DbColumnCreate');

		case funcDb.DB_COLUMN_DELETE.id:
			return import('components/Group/Func/DbColumnDelete');

		case funcMaths.MATH_COUNT.id:
			return import('components/Group/Func/MathCount');

		case funcMaths.MATH_MAX.id:
		case funcMaths.MATH_MIN.id:
			return import('components/Group/Func/MathMinMax');

		case funcMaths.MATH_TRIG.id:
			return import('components/Group/Func/MathTrigonometry');

		case funcMaths.MATH_LOG.id:
			return import('components/Group/Func/MathLog');

		case funcMaths.MATH_SYSTEM.id:
			return import('components/Group/Func/MathSystem');

		case funcHash.HASH_PASSWORD.id:
			return import('components/Group/Func/HashPassword');

		case funcHash.HASH_CRYPTO.id:
			return import('components/Group/Func/HashCrypto');

		case funcServer.SERVER_HTTP.id:
			return import('components/Group/Func/ServerHttp');
	}
};

let Func = ({ 
	funcTemplateId,
	scriptId, 
	id,
}) => {
	const Component = React.lazy(_load(funcTemplateId));

	return <React.Fragment>
		<Box py={2}>
			<Typography variant="h6">
				Параметры функции:
			</Typography>
		</Box>
		<React.Suspense fallback={<Typography>Подождите...</Typography>}>
			<Component 
				scriptId={scriptId}
				id={id} />
		</React.Suspense>
	</React.Fragment>;
};

Func = React.memo(Func);
Func.defaultProps = {
	funcTemplateId: 0,
	scriptId: 0,
};

export default Func;
