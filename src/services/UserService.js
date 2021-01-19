import axios from 'axios';
//import qs from 'qs';
import AuthHeader from './AuthHeader';

class UserService {
	createTask(fd){
		let headersObj = {
			...AuthHeader(),
			'content-type': 'application/json'
		}
    	return axios({
						method: 'post',
						url: '/user/task/create',
						data: fd,
						headers: headersObj
					});
	}
	updateTask(fd){
		let headersObj = {
			...AuthHeader(),
			'content-type': 'application/json'
		}
		console.log(fd);
    	return axios({
						method: 'post',
						url: '/user/task/update',
						data: fd,
						headers: headersObj
					});
	}
	deleteOneTask(fd){
		let headersObj = {
			...AuthHeader(),
			'content-type': 'application/json'
		}
    	return axios({
						method: 'delete',
						url: '/user/task/delete',
						data: fd,
						headers: headersObj
					});
    }
    deleteMultipleTask(fd){
		let headersObj = {
			...AuthHeader(),
			'content-type': 'application/json'
		}
    	return axios({
						method: 'delete',
						url: '/user/task/delete/multiple',
						data: fd,
						headers: headersObj
					});
    }
	getAllTasks(){
		return axios.get('/user/task/all', { headers: AuthHeader() });
	}
	getTask(taskId){
		return axios.get(`/user/task/${taskId}`, { headers: AuthHeader() });
	}


	createList(fd){
		let headersObj = {
			...AuthHeader(),
			'content-type': 'application/json'
		}
    	return axios({
						method: 'post',
						url: '/user/lists/create',
						data: fd,
						headers: headersObj
					});
	}
	updateList(fd){
		let headersObj = {
			...AuthHeader(),
			'content-type': 'application/json'
		}
    	return axios({
						method: 'post',
						url: '/user/lists/update',
						data: fd,
						headers: headersObj
					});
	}
	deleteOneList(fd){
		let headersObj = {
			...AuthHeader(),
			'content-type': 'application/json'
		}
    	return axios({
						method: 'delete',
						url: '/user/lists/delete',
						data: fd,
						headers: headersObj
					});
    }
    inviteUser(fd){
    	let headersObj = {
    		...AuthHeader(),
    		'content-type': 'application/json'
    	}
    	return axios({
    		method: 'post',
    		url: '/user/lists/invite',
    		data: fd,
    		headers: headersObj
    	})
    }
	getAllLists(){
		return axios.get('/user/lists/all', { headers: AuthHeader() });
	}
	getList(listId){
		return axios.get(`/user/lists/${listId}`, { headers: AuthHeader() });
	}
}
export default new UserService();