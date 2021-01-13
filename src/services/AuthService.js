import axios from 'axios';
import AuthHeader from './AuthHeader';

class AuthService {
	login(fd){
		let headersObj = {
			'content-type': 'application/json'
		}
		return axios({
						method: 'post',
						url: '/auth/email/login',
						data: fd,
						headers: headersObj
					});
	}
	signup(fd){
		let headersObj = {
			'content-type': 'application/json'
		}
		return axios({
						method: 'post',
						url: '/auth/email/signup',
						data: fd,
						headers: headersObj
					});
    }
    authenticateToken(fd){
		let headersObj = {
			'content-type': 'application/json'
		}
    	return axios({
						method: 'post',
						url: '/auth/verify/token',
						data: fd,
						headers: headersObj
					});
    }
    updateName(fd){
    	let headersObj = {
	    	...AuthHeader(),
	    	'content-type': 'application/json'
    	};
    	return axios({
			    		method: 'post',
			    		url: '/user/update/name',
			    		data: fd,
			    		headers: headersObj
			    	});
    }
	logout(){
		localStorage.removeItem('user');
	}
    getCurrentUser(){
    	return JSON.parse(localStorage.getItem('user'));
    }
    userAvailable(){
    	if(JSON.parse(localStorage.getItem('user'))){
    		return true;
    	}
    	return false;
    }
}

export default new AuthService();