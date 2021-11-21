
export const PROTOCOL_TYPE_HTTP = {
	id: process.env.PROTOCOL_TYPE_HTTP,
	text: () => 'http',
};
export const PROTOCOL_TYPE_HTTPS = {
	id: process.env.PROTOCOL_TYPE_HTTPS,
	text: () => 'https',
};
export const PROTOCOL_TYPE_WS = {
	id: process.env.PROTOCOL_TYPE_WS,
	text: () => 'ws',
};
export const PROTOCOL_TYPE_TCP = {
	id: process.env.PROTOCOL_TYPE_TCP,
	text: () => 'tcp/ip',
};

const protocol = {
	[process.env.PROTOCOL_TYPE_HTTP]: PROTOCOL_TYPE_HTTP,
	[process.env.PROTOCOL_TYPE_HTTPS]: PROTOCOL_TYPE_HTTPS,
	[process.env.PROTOCOL_TYPE_WS]: PROTOCOL_TYPE_WS,
	[process.env.PROTOCOL_TYPE_TCP]: PROTOCOL_TYPE_TCP,
};

export default protocol;