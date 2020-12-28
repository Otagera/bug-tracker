import axios from 'axios';

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
		    			/*if(response.data.token){
		    				localStorage.setItem('user', JSON.stringify({ token: response.data.token }));
		    			}
		    			return { success: true };*/
		    			return response;
		    		})
		    		.catch(err=>{
		    			return { error: true };
		    		});
	}
	logout(){
		localStorage.removeItem('user');
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