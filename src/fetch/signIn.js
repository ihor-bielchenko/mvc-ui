import axios from 'axios';
import { URL_API_SSO_SIGN_IN } from 'consts/url.js';

const signIn = async (data) => {
	const r = await axios(process.env.SSO_PATH + URL_API_SSO_SIGN_IN, {
		method: 'get',
		params: data,
	});
	
	return r;
};

export default signIn;
