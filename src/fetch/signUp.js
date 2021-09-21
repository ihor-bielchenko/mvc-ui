import axios from 'axios';
import { URL_API_SSO_SIGN_UP } from 'consts/url.js';

const signUp = async (data) => {
	return await axios(process.env.SSO_PATH + URL_API_SSO_SIGN_UP, {
		method: 'post',
		data,
	});
};

export default signUp;
