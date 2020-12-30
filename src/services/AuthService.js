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
					}).then(response=>{
		    			return response;
		    		})
		    		.catch(err=>{
		    			return { error: true };
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
					}).then(response=>{
    		 			return response;
    				}).catch(err=>{
		    			return { error: err };
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
					}).then(response=>{
		    			if(response.data.code === 200 && response.data.data.token){
		    				console.log(response.data.data.token);
		    				localStorage.setItem('user', JSON.stringify({ token: response.data.data.token }));
		    			}
    		 			return response;
    				}).catch(err=>{
		    			return { error: err };
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
			    	}).then(response=>{
			    		return response;
			    	}).catch(err=>{
			    		return { error: err };
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