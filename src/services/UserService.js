import axios from 'axios';
//import qs from 'qs';
//import AuthHeader from './AuthHeader';
import black from '../assets/images/black.jpg';

class UserService {
	getCompanies(){
		return axios.get('/companies');
	}
	getCompany(fakeId){
		return axios.get(`/company/${fakeId}`);
	}
	postCompany(fd){
		//return axios.post('/companies', fd, { headers: AuthHeader() });
		return axios.post('/companies', fd);
	}
	putCompany(fakeId, fd){
		return axios.put(`/company/${fakeId}`, fd);
		/* let headersObj = {
			...AuthHeader(),
			'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
		};
		return axios({
        	method: 'put',
        	url: `/company/${fakeId}`,
        	data: qs.stringify(companyData),
        	headers: headersObj
        }) */
	}
	deleteCompany(fakeId){
		//return axios.delete(`/company/${fakeId}`, { headers: AuthHeader() });
		return axios.delete(`/company/${fakeId}`);
	}

	getCompetitions(fakeId){
		if(fakeId){
			return axios.get(`/competitions/${fakeId}`);
		}else {
			return axios.get(`/competitions`);
		}
	}
	getCompetition(fakeId){
		return axios.get(`/competition/${fakeId}`);
	}
	postCompetition(fd){
		return axios.post('/competitions', fd);
	}
	putCompetition(fakeId, fd){
		return axios.put(`/competition/${fakeId}`, fd);
	}
	deleteCompetition(fakeId){
		return axios.delete(`/competition/${fakeId}`);
	}

	getCategories(fakeId){
		if(fakeId){
			return axios.get(`/competition/${fakeId}/categories`);
		}else {
			return axios.get('/categories');
		}
	}
	getCategory(fakeId){
		return axios.get(`/category/${fakeId}`);
	}
	postCategory(fd){
		return axios.post('/categories', fd);
	}
	putCategory(fakeId, fd){
		return axios.put(`/category/${fakeId}`, fd);
	}
	deleteCategory(fakeId){
		return axios.delete(`/category/${fakeId}`);
	}

	getContestants(fakeId){
		if(fakeId){
			return axios.get(`/category/${fakeId}/contestants`);
		}else{
			return axios.get('/contestants');
		}
	}
	getContestant(categoryFakeId, contestantFakeId){
		return axios.get(`/category/${categoryFakeId}/contestant/${contestantFakeId}`);
	}
	postContestant(fakeId, fd){
		return axios.post(`/category/${fakeId}/contestants`, fd);
	}
	putContestant(categoryFakeId, contestantFakeId, fd){
		return axios.put(`/category/${categoryFakeId}/contestant/${contestantFakeId}`, fd);
	}
	deleteContestant(categoryFakeId, contestantFakeId){
		return axios.delete(`/category/${categoryFakeId}/contestant/${contestantFakeId}`)
	}
	voteContestant(categoryFakeId, contestantFakeId){
		return axios.put(`/category/${categoryFakeId}/contestant/${contestantFakeId}/vote`);
	}

	updateImgURL(img){
		if(axios.defaults.baseURL === 'http://127.0.0.1:3003/api'){
			if(img){
				return axios.defaults.baseURL + '/' + img;				
			}else {
				return black;
			}
		}
		return img;
	}
}
export default new UserService();