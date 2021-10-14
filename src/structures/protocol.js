
export const PROTOCOL_HTTP = {
	id: process.env.PROTOCOL_HTTP,
	text: () => 'http',
};
export const PROTOCOL_HTTPS = {
	id: process.env.PROTOCOL_HTTPS,
	text: () => 'https',
};
export const PROTOCOL_WS = {
	id: process.env.PROTOCOL_WS,
	text: () => 'ws',
};

const protocol = {
	[process.env.PROTOCOL_HTTP]: PROTOCOL_HTTP,
	[process.env.PROTOCOL_HTTPS]: PROTOCOL_HTTPS,
	[process.env.PROTOCOL_WS]: PROTOCOL_WS,
};

export default protocol;