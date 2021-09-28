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

				LOGIC_PATH: process.env.LOGIC_PATH,
				CORE_PATH: process.env.CORE_PATH,
				SSO_PATH: process.env.SSO_PATH,
				DB_PATH: process.env.DB_PATH,
				FILES_PATH: process.env.FILES_PATH,
				LOGS_PATH: process.env.LOGS_PATH,
				CRON_PATH: process.env.CRON_PATH,
				CAPTCHA_KEY: process.env.CAPTCHA_KEY,
				ENTITY_PROP: Number(process.env.ENTITY_PROP),
				ENTITY_JSON: Number(process.env.ENTITY_JSON),
				ENTITY_FUNC: Number(process.env.ENTITY_FUNC),
				ENTITY_CONDITION: Number(process.env.ENTITY_CONDITION),
				FORMAT_ARR: Number(process.env.FORMAT_ARR),
				FORMAT_OBJ: Number(process.env.FORMAT_OBJ),
				FORMAT_ATOMIC: Number(process.env.FORMAT_ATOMIC),
				ARROW_BASE: Number(process.env.ARROW_BASE),
				ARROW_TRUE: Number(process.env.ARROW_TRUE),
				ARROW_FALSE: Number(process.env.ARROW_FALSE),
				COLUMN_ID: Number(process.env.COLUMN_ID),
				COLUMN_TEXT: Number(process.env.COLUMN_TEXT),
				COLUMN_RICHTEXT: Number(process.env.COLUMN_RICHTEXT),
				COLUMN_NUMBER: Number(process.env.COLUMN_NUMBER),
				COLUMN_BOOLEAN: Number(process.env.COLUMN_BOOLEAN),
				COLUMN_TIME: Number(process.env.COLUMN_TIME),
				COLUMN_EMAIL: Number(process.env.COLUMN_EMAIL),
				COLUMN_IP: Number(process.env.COLUMN_IP),
				COLUMN_MAC: Number(process.env.COLUMN_MAC),
				COLUMN_URL: Number(process.env.COLUMN_URL),
				COLUMN_PASSWORD: Number(process.env.COLUMN_PASSWORD),
				COLUMN_FILE: Number(process.env.COLUMN_FILE),
				COLUMN_OBJ: Number(process.env.COLUMN_OBJ),
				COLUMN_ARR: Number(process.env.COLUMN_ARR),
				COLUMN_NULL: Number(process.env.COLUMN_NULL),
				COLUMN_VAR: Number(process.env.COLUMN_VAR),
				SOURCE_MANUALLY: Number(process.env.SOURCE_MANUALLY),
				SOURCE_DB: Number(process.env.SOURCE_DB),
				SOURCE_PROXY_PASS: Number(process.env.SOURCE_PROXY_PASS),
				SOURCE_HEADER: Number(process.env.SOURCE_HEADER),
				SOURCE_REQUEST: Number(process.env.SOURCE_REQUEST),
				SOURCE_COOKIE: Number(process.env.SOURCE_COOKIE),
				SOURCE_PLACEHOLDER: Number(process.env.SOURCE_PLACEHOLDER),
				SOURCE_RAND: Number(process.env.SOURCE_RAND),
				SOURCE_SCRIPT: Number(process.env.SOURCE_SCRIPT),
				UNION_AND: Number(process.env.UNION_AND),
				UNION_OR: Number(process.env.UNION_OR),
				IF_MORE: Number(process.env.IF_MORE),
				IF_LESS: Number(process.env.IF_LESS),
				IF_EQUAL: Number(process.env.IF_EQUAL),
				IF_NOT_EQUAL: Number(process.env.IF_NOT_EQUAL),
				IF_MORE_EQUAL: Number(process.env.IF_MORE_EQUAL),
				IF_LESS_EQUAL: Number(process.env.IF_LESS_EQUAL),
				METHOD_GET: Number(process.env.METHOD_GET),
				METHOD_POST: Number(process.env.METHOD_POST),
				METHOD_PUT: Number(process.env.METHOD_PUT),
				METHOD_PATCH: Number(process.env.METHOD_PATCH),
				METHOD_DELETE: Number(process.env.METHOD_DELETE),
				JSON_NULL: Number(process.env.JSON_NULL),
				JSON_UNDEFINED: Number(process.env.JSON_UNDEFINED),
				JSON_OBJ: Number(process.env.JSON_OBJ),
				JSON_ARR: Number(process.env.JSON_ARR),
				JSON_TEXT: Number(process.env.JSON_TEXT),
				JSON_NUMBER: Number(process.env.JSON_NUMBER),
				JSON_BOOLEAN: Number(process.env.JSON_BOOLEAN),
				FUNC_IF: Number(process.env.FUNC_IF),
				FUNC_DB: Number(process.env.FUNC_DB),
				FUNC_TEXT: Number(process.env.FUNC_TEXT),
				FUNC_MATH: Number(process.env.FUNC_MATH),
				FUNC_TIME: Number(process.env.FUNC_TIME),
				FUNC_HASH: Number(process.env.FUNC_HASH),
				FUNC_SERVER: Number(process.env.FUNC_SERVER),
				IF_COMPARE: Number(process.env.IF_COMPARE),
				IF_TYPE: Number(process.env.IF_TYPE),
				IF_PARITY: Number(process.env.IF_PARITY),
				IF_INTEGER: Number(process.env.IF_INTEGER),
				IF_NOT_NULL: Number(process.env.IF_NOT_NULL),
				IF_REG_EXP: Number(process.env.IF_REG_EXP),
				LOOP_BREAK: Number(process.env.LOOP_BREAK),
				LOOP_CONTINUE: Number(process.env.LOOP_CONTINUE),
				TEXT_TYPE: Number(process.env.TEXT_TYPE),
				TEXT_NOT_NULL: Number(process.env.TEXT_NOT_NULL),
				TEXT_REG_EXP: Number(process.env.TEXT_REG_EXP),
				TEXT_LENGTH: Number(process.env.TEXT_LENGTH),
				TEXT_SPLIT: Number(process.env.TEXT_SPLIT),
				TEXT_JOIN: Number(process.env.TEXT_JOIN),
				TEXT_UPPERCASE: Number(process.env.TEXT_UPPERCASE),
				TEXT_LOWERCASE: Number(process.env.TEXT_LOWERCASE),
				TEXT_REVERSE: Number(process.env.TEXT_REVERSE),
				TEXT_FIND: Number(process.env.TEXT_FIND),
				TEXT_REPLACE: Number(process.env.TEXT_REPLACE),
				MATH_TYPE: Number(process.env.MATH_TYPE),
				MATH_PARITY: Number(process.env.MATH_PARITY),
				MATH_INTEGER: Number(process.env.MATH_INTEGER),
				MATH_INFINITY: Number(process.env.MATH_INFINITY),
				MATH_COUNT: Number(process.env.MATH_COUNT),
				MATH_ROUND: Number(process.env.MATH_ROUND),
				MATH_MAX: Number(process.env.MATH_MAX),
				MATH_MIN: Number(process.env.MATH_MIN),
				MATH_TRIG: Number(process.env.MATH_TRIG),
				MATH_LOG: Number(process.env.MATH_LOG),
				MATH_SYSTEM: Number(process.env.MATH_SYSTEM),
				DB_CREATE: Number(process.env.DB_CREATE),
				DB_COPY: Number(process.env.DB_COPY),
				DB_DELETE: Number(process.env.DB_COPY),
				DB_COLUMN_CREATE: Number(process.env.DB_COLUMN_CREATE),
				DB_COLUMN_DELETE: Number(process.env.DB_COLUMN_DELETE),
				TIME_FORMAT: Number(process.env.TIME_FORMAT),
				TIME_UPDATE: Number(process.env.TIME_UPDATE),
				TIME_ZONE: Number(process.env.TIME_ZONE),
				HASH_PASSWORD: Number(process.env.HASH_PASSWORD),
				HASH_BASE64: Number(process.env.HASH_BASE64),
				HASH_HASH: Number(process.env.HASH_HASH),
				HASH_CRYPTO: Number(process.env.HASH_CRYPTO),
				ARR_BASE: Number(process.env.ARR_BASE),
				SERVER_HTTP: Number(process.env.SERVER_HTTP),
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
