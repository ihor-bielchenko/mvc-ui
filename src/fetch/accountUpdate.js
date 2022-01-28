import axios from 'axios';
import forbidden from './forbidden.js';
import refreshJWTTimeout from 'utils/refreshJWTTimeout.js';
import { URL_API_SSO_USER } from 'consts/url.js';

const accountUpdate = async (data) => {
	
	let r = {};
	
	try {
		if(data.avatarFile){
			const formData = new FormData();
			formData.append("avatarFile", data.avatarFile);

			r =  await axios(process.env.SSO_PATH + URL_API_SSO_USER +'/avatar', {
				method: 'patch',
				params: {
					access_token: localStorage.getItem('access_token'),
					...formData,
				},
			}) 
		}
		delete data.avatarFile
		delete data.avatar
		r = { ...await axios(process.env.SSO_PATH + URL_API_SSO_USER, {
					method: 'patch',
					params: {
						access_token: localStorage.getItem('access_token'),
						...data,
					},
				}), ...r }
		
		refreshJWTTimeout();

		return r;
	}
	catch (err) {
		return await forbidden(err, async () => await accountUpdate(data));
	}

};

export default accountUpdate;

