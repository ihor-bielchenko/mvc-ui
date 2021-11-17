'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
	throw new Error(
		'The NODE_ENV environment variable is required but was not specified.'
	);
}

// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
const dotenvFiles = [
	`${paths.dotenv}.${NODE_ENV}.local`,
	// Don't include `.env.local` for `test` environment
	// since normally you expect tests to produce the same
	// results for everyone
	NODE_ENV !== 'test' && `${paths.dotenv}.local`,
	`${paths.dotenv}.${NODE_ENV}`,
	paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach(dotenvFile => {
	if (fs.existsSync(dotenvFile)) {
		require('dotenv-expand')(
			require('dotenv').config({
				path: dotenvFile,
			})
		);
	}
});

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebook/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of webpack shims.
// https://github.com/facebook/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
	.split(path.delimiter)
	.filter(folder => folder && !path.isAbsolute(folder))
	.map(folder => path.resolve(appDirectory, folder))
	.join(path.delimiter);

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in webpack configuration.
const REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
	const raw = Object.keys(process.env)
		.filter(key => REACT_APP.test(key))
		.reduce(
			(env, key) => {
				env[key] = process.env[key];
				return env;
			},
			{
				// Useful for determining whether we’re running in production mode.
				// Most importantly, it switches React into the correct mode.
				NODE_ENV: process.env.NODE_ENV || 'development',
				// Useful for resolving the correct path to static assets in `public`.
				// For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
				// This should only be used as an escape hatch. Normally you would put
				// images into the `src` and `import` them in code to get their paths.
				PUBLIC_URL: publicUrl,
				// We support configuring the sockjs pathname during development.
				// These settings let a developer run multiple simultaneous projects.
				// They are used as the connection `hostname`, `pathname` and `port`
				// in webpackHotDevClient. They are used as the `sockHost`, `sockPath`
				// and `sockPort` options in webpack-dev-server.
				WDS_SOCKET_HOST: process.env.WDS_SOCKET_HOST,
				WDS_SOCKET_PATH: process.env.WDS_SOCKET_PATH,
				WDS_SOCKET_PORT: process.env.WDS_SOCKET_PORT,
				// Whether or not react-refresh is enabled.
				// react-refresh is not 100% stable at this time,
				// which is why it's disabled by default.
				// It is defined here so it is available in the webpackHotDevClient.
				FAST_REFRESH: process.env.FAST_REFRESH !== 'false',

				SSO_PATH: process.env.SSO_PATH,
				SCRIPT_PATH: process.env.SCRIPT_PATH,
				SOURCE_PATH: process.env.SOURCE_PATH,
				DB_PATH: process.env.DB_PATH,

				ARROW_TYPE_DEFAULT: Number(process.env.ARROW_TYPE_DEFAULT),
				ARROW_TYPE_TRUE: Number(process.env.ARROW_TYPE_TRUE),
				ARROW_TYPE_FALSE: Number(process.env.ARROW_TYPE_FALSE),
				ARROW_TYPE_LOOP: Number(process.env.ARROW_TYPE_LOOP),

				DATA_TYPE_ATOMIC: Number(process.env.DATA_TYPE_ATOMIC),
				DATA_TYPE_ID: Number(process.env.DATA_TYPE_ID),
				DATA_TYPE_TEXT: Number(process.env.DATA_TYPE_TEXT),
				DATA_TYPE_NUMBER: Number(process.env.DATA_TYPE_NUMBER),
				DATA_TYPE_BOOLEAN: Number(process.env.DATA_TYPE_BOOLEAN),
				DATA_TYPE_OBJECT: Number(process.env.DATA_TYPE_OBJECT),
				DATA_TYPE_ARRAY: Number(process.env.DATA_TYPE_ARRAY),
				DATA_TYPE_NULL: Number(process.env.DATA_TYPE_NULL),
				DATA_TYPE_RICHTEXT: Number(process.env.DATA_TYPE_RICHTEXT),
				DATA_TYPE_TIME: Number(process.env.DATA_TYPE_TIME),
				DATA_TYPE_EMAIL: Number(process.env.DATA_TYPE_EMAIL),
				DATA_TYPE_IP: Number(process.env.DATA_TYPE_IP),
				DATA_TYPE_MAC: Number(process.env.DATA_TYPE_MAC),
				DATA_TYPE_URL: Number(process.env.DATA_TYPE_URL),
				DATA_TYPE_PASSWORD: Number(process.env.DATA_TYPE_PASSWORD),
				DATA_TYPE_FILE: Number(process.env.DATA_TYPE_FILE),

				SOURCE_TYPE_MANUALLY: Number(process.env.SOURCE_TYPE_MANUALLY),
				SOURCE_TYPE_DB: Number(process.env.SOURCE_TYPE_DB),
				SOURCE_TYPE_PROXY_PASS: Number(process.env.SOURCE_TYPE_PROXY_PASS),
				SOURCE_TYPE_HEADER: Number(process.env.SOURCE_TYPE_HEADER),
				SOURCE_TYPE_REQUEST: Number(process.env.SOURCE_TYPE_REQUEST),
				SOURCE_TYPE_COOKIE: Number(process.env.SOURCE_TYPE_COOKIE),
				SOURCE_TYPE_PLACEHOLDER: Number(process.env.SOURCE_TYPE_PLACEHOLDER),
				SOURCE_TYPE_RAND: Number(process.env.SOURCE_TYPE_RAND),
				SOURCE_TYPE_SCRIPT: Number(process.env.SOURCE_TYPE_SCRIPT),

				PROTOCOL_HTTP: Number(process.env.PROTOCOL_HTTP),
				PROTOCOL_HTTPS: Number(process.env.PROTOCOL_HTTPS),
				PROTOCOL_WS: Number(process.env.PROTOCOL_WS),

				OPERATOR_IF_MORE: Number(process.env.OPERATOR_IF_MORE),
				OPERATOR_IF_LESS: Number(process.env.OPERATOR_IF_LESS),
				OPERATOR_IF_EQUAL: Number(process.env.OPERATOR_IF_EQUAL),
				OPERATOR_IF_NOT_EQUAL: Number(process.env.OPERATOR_IF_NOT_EQUAL),
				OPERATOR_IF_MORE_EQUAL: Number(process.env.OPERATOR_IF_MORE_EQUAL),
				OPERATOR_IF_LESS_EQUAL: Number(process.env.OPERATOR_IF_LESS_EQUAL),

				OPERATOR_UNION_AND: Number(process.env.OPERATOR_UNION_AND),
				OPERATOR_UNION_OR: Number(process.env.OPERATOR_UNION_OR),

				METHOD_GET: Number(process.env.METHOD_GET),
				METHOD_POST: Number(process.env.METHOD_POST),
				METHOD_PUT: Number(process.env.METHOD_PUT),
				METHOD_PATCH: Number(process.env.METHOD_PATCH),
				METHOD_DELETE: Number(process.env.METHOD_DELETE),

				FUNC_TEMPLATE_IF_COMPARE: Number(process.env.FUNC_TEMPLATE_IF_COMPARE),
				FUNC_TEMPLATE_IF_TYPE: Number(process.env.FUNC_TEMPLATE_IF_TYPE),
				FUNC_TEMPLATE_IF_PARITY: Number(process.env.FUNC_TEMPLATE_IF_PARITY),
				FUNC_TEMPLATE_IF_INTEGER: Number(process.env.FUNC_TEMPLATE_IF_INTEGER),
				FUNC_TEMPLATE_IF_NOT_NULL: Number(process.env.FUNC_TEMPLATE_IF_NOT_NULL),
				FUNC_TEMPLATE_IF_REG_EXP: Number(process.env.FUNC_TEMPLATE_IF_REG_EXP),

				FUNC_TEMPLATE_TEXT_LENGTH: Number(process.env.FUNC_TEMPLATE_TEXT_LENGTH),
				FUNC_TEMPLATE_TEXT_SPLIT: Number(process.env.FUNC_TEMPLATE_TEXT_SPLIT),
				FUNC_TEMPLATE_TEXT_JOIN: Number(process.env.FUNC_TEMPLATE_TEXT_JOIN),
				FUNC_TEMPLATE_TEXT_UPPERCASE: Number(process.env.FUNC_TEMPLATE_TEXT_UPPERCASE),
				FUNC_TEMPLATE_TEXT_LOWERCASE: Number(process.env.FUNC_TEMPLATE_TEXT_LOWERCASE),
				FUNC_TEMPLATE_TEXT_REVERSE: Number(process.env.FUNC_TEMPLATE_TEXT_REVERSE),
				FUNC_TEMPLATE_TEXT_FIND: Number(process.env.FUNC_TEMPLATE_TEXT_FIND),
				FUNC_TEMPLATE_TEXT_REPLACE: Number(process.env.FUNC_TEMPLATE_TEXT_REPLACE),
				FUNC_TEMPLATE_TEXT_SUBSTR: Number(process.env.FUNC_TEMPLATE_TEXT_SUBSTR),

				FUNC_TEMPLATE_MATH_INFINITY: Number(process.env.FUNC_TEMPLATE_MATH_INFINITY),
				FUNC_TEMPLATE_MATH_NAN: Number(process.env.FUNC_TEMPLATE_MATH_NAN),
				FUNC_TEMPLATE_MATH_COUNT: Number(process.env.FUNC_TEMPLATE_MATH_COUNT),
				FUNC_TEMPLATE_MATH_ROUND: Number(process.env.FUNC_TEMPLATE_MATH_ROUND),
				FUNC_TEMPLATE_MATH_MAX: Number(process.env.FUNC_TEMPLATE_MATH_MAX),
				FUNC_TEMPLATE_MATH_MIN: Number(process.env.FUNC_TEMPLATE_MATH_MIN),
				FUNC_TEMPLATE_MATH_TRIG: Number(process.env.FUNC_TEMPLATE_MATH_TRIG),
				FUNC_TEMPLATE_MATH_LOG: Number(process.env.FUNC_TEMPLATE_MATH_LOG),
				FUNC_TEMPLATE_MATH_SYSTEM: Number(process.env.FUNC_TEMPLATE_MATH_SYSTEM),

				FUNC_TEMPLATE_ARR_GET: Number(process.env.FUNC_TEMPLATE_ARR_GET),
				FUNC_TEMPLATE_ARR_SET: Number(process.env.FUNC_TEMPLATE_ARR_SET),
				FUNC_TEMPLATE_ARR_DEL: Number(process.env.FUNC_TEMPLATE_ARR_DEL),
				FUNC_TEMPLATE_ARR_LENGTH: Number(process.env.FUNC_TEMPLATE_ARR_LENGTH),
				FUNC_TEMPLATE_ARR_INDEX_OF: Number(process.env.FUNC_TEMPLATE_ARR_INDEX_OF),
				FUNC_TEMPLATE_ARR_SPLICE: Number(process.env.FUNC_TEMPLATE_ARR_SPLICE),
				FUNC_TEMPLATE_ARR_REVERSE: Number(process.env.FUNC_TEMPLATE_ARR_REVERSE),
				FUNC_TEMPLATE_ARR_MERGE: Number(process.env.FUNC_TEMPLATE_ARR_MERGE),
				FUNC_TEMPLATE_ARR_REDUCE: Number(process.env.FUNC_TEMPLATE_ARR_REDUCE),
				FUNC_TEMPLATE_ARR_FOR_EACH: Number(process.env.FUNC_TEMPLATE_ARR_FOR_EACH),
				FUNC_TEMPLATE_ARR_FILTER: Number(process.env.FUNC_TEMPLATE_ARR_FILTER),
				FUNC_TEMPLATE_ARR_SORT: Number(process.env.FUNC_TEMPLATE_ARR_SORT),
				FUNC_TEMPLATE_ARR_FIND: Number(process.env.FUNC_TEMPLATE_ARR_FIND),
				FUNC_TEMPLATE_ARR_TO_OBJ: Number(process.env.FUNC_TEMPLATE_ARR_TO_OBJ),

				FUNC_TEMPLATE_OBJ_GET: Number(process.env.FUNC_TEMPLATE_OBJ_GET),
				FUNC_TEMPLATE_OBJ_SET: Number(process.env.FUNC_TEMPLATE_OBJ_SET),
				FUNC_TEMPLATE_OBJ_DEL: Number(process.env.FUNC_TEMPLATE_OBJ_DEL),
				FUNC_TEMPLATE_OBJ_LENGTH: Number(process.env.FUNC_TEMPLATE_OBJ_LENGTH),
				FUNC_TEMPLATE_OBJ_FOR_EACH: Number(process.env.FUNC_TEMPLATE_OBJ_FOR_EACH),
				FUNC_TEMPLATE_OBJ_KEYS: Number(process.env.FUNC_TEMPLATE_OBJ_KEYS),
				FUNC_TEMPLATE_OBJ_TO_ARR: Number(process.env.FUNC_TEMPLATE_OBJ_TO_ARR),

				FUNC_TEMPLATE_DB_CREATE: Number(process.env.FUNC_TEMPLATE_DB_CREATE),
				FUNC_TEMPLATE_DB_COPY: Number(process.env.FUNC_TEMPLATE_DB_COPY),
				FUNC_TEMPLATE_DB_DELETE: Number(process.env.FUNC_TEMPLATE_DB_DELETE),
				FUNC_TEMPLATE_DB_COLUMN_CREATE: Number(process.env.FUNC_TEMPLATE_DB_COLUMN_CREATE),
				FUNC_TEMPLATE_DB_COLUMN_DELETE: Number(process.env.FUNC_TEMPLATE_DB_COLUMN_DELETE),

				FUNC_TEMPLATE_TIME_FORMAT: Number(process.env.FUNC_TEMPLATE_TIME_FORMAT),
				FUNC_TEMPLATE_TIME_UPDATE: Number(process.env.FUNC_TEMPLATE_TIME_UPDATE),
				FUNC_TEMPLATE_TIME_ZONE: Number(process.env.FUNC_TEMPLATE_TIME_ZONE),

				FUNC_TEMPLATE_HASH_PASSWORD: Number(process.env.FUNC_TEMPLATE_HASH_PASSWORD),
				FUNC_TEMPLATE_HASH_BASE64: Number(process.env.FUNC_TEMPLATE_HASH_BASE64),
				FUNC_TEMPLATE_HASH_HASH: Number(process.env.FUNC_TEMPLATE_HASH_HASH),
				FUNC_TEMPLATE_HASH_CRYPTO: Number(process.env.FUNC_TEMPLATE_HASH_CRYPTO),

				FUNC_TEMPLATE_SERVER_HTTP: Number(process.env.FUNC_TEMPLATE_SERVER_HTTP),
			}
		);
	// Stringify all values so we can feed into webpack DefinePlugin
	const stringified = {
		'process.env': Object.keys(raw).reduce((env, key) => {
			env[key] = JSON.stringify(raw[key]);
			return env;
		}, {}),
	};

	return { raw, stringified };
}

module.exports = getClientEnvironment;
