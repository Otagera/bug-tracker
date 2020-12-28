import * as actionTypes from './actionTypes';
import UserService from '../../services/UserService';

//Company
export const addCompanyInit = () =>{
	return {
		type: actionTypes.ADD_COMPANY_INIT
	};
}
const addCompany = success =>{
	return {
		type: actionTypes.ADD_COMPANY,
		success: success
	};
}
export const addCompanyRequest = companyData =>{
	return dispatch =>{
		UserService.postCompany(companyData)
			.then(response=>{
				if(response.status === 201) { dispatch(addCompany(true)); }
			}).catch(err=>{console.log(err); dispatch(addCompany(false))});
	}
}

export const removeCompanyInit = () =>{
	return {
		type: actionTypes.REMOVE_COMPANY_INIT
	};
}
const removeCompany = success =>{
	return {
		type: actionTypes.REMOVE_COMPANY,
		success: success
	};
}
export const removeCompanyRequest = (fakeId) =>{
	return dispatch =>{
		UserService.deleteCompany(fakeId)
			.then(response=>{
				if(response.status === 200) { dispatch(removeCompany(true)); }
			}).catch(err=>{console.log(err); dispatch(removeCompany(false))});
	}
}

export const editCompanyInit = () =>{
	return {
		type: actionTypes.EDIT_COMPANY_INIT
	};
}
const editCompany = success =>{
	return {
		type: actionTypes.EDIT_COMPANY,
		success: success
	};
}
export const editCompanyRequest = (fakeId, companyData) =>{
	return dispatch =>{
		UserService.putCompany(fakeId, companyData)
			.then(response=>{
				if(response.status === 200) { dispatch(editCompany(true)); }
			}).catch(err=>{console.log(err); dispatch(editCompany(false))});
	}
}

const getCompanies = companies =>{
	return {
		type: actionTypes.GET_COMPANIES,
		companies: companies
	};
}
export const getCompaniesRequest = () =>{
	return dispatch => {
		UserService.getCompanies()
			.then(companyResponse=>{
            	let companies = companyResponse.data.companies;
            	let promises = [];
                companies.forEach((company)=>{
                    company.img = UserService.updateImgURL(company.img);
                    promises.push(
                    	new Promise((resolve, reject)=>{
		                    UserService.getCompetitions(company.fakeId)
			                    .then(competResponse=>{
			                    	company.competitions = competResponse.data.competitions;
			                    	resolve('Success');
			                    }).catch(err=>{console.log(err); reject('Failed');});                    		
                    	})
                    );
                });
                Promise.all(promises).then(()=>{
					dispatch(getCompanies(companies));                	
                });
			}).catch(err=>console.log(err));
	};
}

const getCompany = company =>{
	return {
		type: actionTypes.GET_COMPANY,
		company: company
	};
}
export const getCompanyRequest = fakeId =>{
	return dispatch =>{
		new Promise((resolve, reject)=>{
			UserService.getCompany(fakeId)
				.then(response=>{
	            	let company = response.data.company;
	                company.img = UserService.updateImgURL(company.img);
	                resolve(company);
				}).catch(err=>reject(err));
		}).then(company=>{
			return new Promise((resolve, reject)=>{
				UserService.getCompetitions(company.fakeId)
	                .then(competResponse=>{
	                	company.competitions = competResponse.data.competitions;
	                	resolve(company);
	                }).catch(err=>reject(err));
			});
		}).then(company=>{
			return new Promise((resolve, reject)=>{
				let promises = [];
				for(let i = 0; i < company.competitions.length; i++){
					promises.push(new Promise((resolve, reject)=>{
			            UserService.getCategories(company.competitions[i].fakeId).then(catResponse=>{
							company.competitions[i].categories = catResponse.data.categories;
							resolve('Success');
			    		}).catch(err=>reject(err));
					}));
				}
				Promise.all(promises).then(()=>{
			    	resolve(company);
				});
			});
		}).then(company=>{
			dispatch(getCompany(company));
		}).catch(err=>{
			console.log(err);
		});
	};
}


//Competition
export const addCompetitionInit = () =>{
	return {
		type: actionTypes.ADD_COMPETITION_INIT
	};
}
const addCompetition = success =>{
	return {
		type: actionTypes.ADD_COMPETITION,
		success: success
	};
}
export const addCompetitionRequest = competitionData =>{
	return dispatch =>{
		UserService.postCompetition(competitionData)
			.then(response=>{
				if(response.status === 201){ dispatch(addCompetition(true)); }
			}).catch(err=>{console.log(err); dispatch(addCompetition(false)); });
	}
}

export const editCompetitionInit = () =>{
	return {
		type: actionTypes.EDIT_COMPETITION_INIT
	};
}
const editCompetition = success =>{
	return {
		type: actionTypes.EDIT_COMPETITION,
		success: success
	};
}
export const editCompetitionRequest = (fakeId, competitionData) =>{
	return dispatch =>{
		UserService.putCompetition(fakeId, competitionData)
			.then(response=>{
				if(response.status === 200) { dispatch(editCompetition(true)); }
			}).catch(err=>{console.log(err); dispatch(editCompetition(false))});
	}
}

const getCompetition = (company, competition) =>{
	return {
		type: actionTypes.GET_COMPETITION,
		company: company,
		competition: competition
	};
}
export const getCompetitionRequest = (companyFakeId, competitionFakeId) =>{
	return dispatch =>{
		new Promise((resolve, reject)=>{
			UserService.getCompetition(competitionFakeId)
				.then(response=>{
					let competition = response.data.competition;
					resolve(competition)
				}).catch(err=>reject(err));
		}).then(competition=>{
			return new Promise((resolve, reject)=>{
	            UserService.getCategories(competition.fakeId).then(catResponse=>{
					competition.categories = catResponse.data.categories;
					resolve(competition);
	    		}).catch(err=>reject(err));
			});
		}).then(competition=>{
			return new Promise((resolve, reject)=>{
				UserService.getCompany(companyFakeId)
					.then(response=>{
		            	let company = response.data.company;
		                company.img = UserService.updateImgURL(company.img);
		                resolve([company, competition]);
					}).catch(err=>reject(err));
			});
		}).then(([company, competition])=>{
			dispatch(getCompetition(company, competition));
		}).catch(err=>{
			console.log(err);
		});
	};
}


//Category
export const addCategoryInit = () =>{
	return {
		type: actionTypes.ADD_CATEGORY_INIT
	};
}
const addCategory = success =>{
	return {
		type: actionTypes.ADD_CATEGORY,
		success: success
	};
}
export const addCategoryRequest = categoryData =>{
	return dispatch =>{
		UserService.postCategory(categoryData)
			.then(response=>{
				if(response.status === 201){ dispatch(addCategory(true)); }
			}).catch(err=>{console.log(err); dispatch(addCategory(false)); });
	}
}

export const editCategoryInit = () =>{
	return {
		type: actionTypes.EDIT_CATEGORY_INIT
	};
}
const editCategory = success =>{
	return {
		type: actionTypes.EDIT_CATEGORY,
		success: success
	};
}
export const editCategoryRequest = (fakeId, categoryData) =>{
	return dispatch =>{
		UserService.putCategory(fakeId, categoryData)
			.then(response=>{
				if(response.status === 200) { dispatch(editCategory(true)); }
			}).catch(err=>{console.log(err); dispatch(editCategory(false))});
	}
}

const getCategory = (company, competition, category) =>{
	return {
		type: actionTypes.GET_CATEGORY,
		company: company,
		competition: competition,
		category: category
	};
}
export const getCategoryRequest = (companyFakeId, competitionFakeId, categoryFakeId) =>{
	return dispatch =>{
		new Promise((resolve, reject)=>{
			UserService.getCompetition(competitionFakeId)
				.then(response=>{
					let competition = response.data.competition;
					resolve(competition)
				}).catch(err=>reject(err));
		}).then(competition=>{
			return new Promise((resolve, reject)=>{
	            UserService.getCategories(competition.fakeId).then(catResponse=>{
					competition.categories = catResponse.data.categories;
					resolve(competition);
	    		}).catch(err=>reject(err));
			});
		}).then(competition=>{
			return new Promise((resolve, reject)=>{
				UserService.getCompany(companyFakeId)
					.then(response=>{
		            	let company = response.data.company;
		                company.img = UserService.updateImgURL(company.img);
		                resolve([company, competition]);
					}).catch(err=>reject(err));
			});
		}).then(([company, competition])=>{
			return new Promise((resolve, reject)=>{
				UserService.getCategory(categoryFakeId)
					.then(response=>{
						let category = response.data.category;
						resolve([company, competition, category]);
					}).catch(err=>reject(err));
			})
		}).then(([company, competition, category])=>{
			dispatch(getCategory(company, competition, category));
		}).catch(err=>{
			console.log(err);
		});
	};
}

//Contestant
export const addContestantInit = () =>{
	return {
		type: actionTypes.ADD_CONTESTANT_INIT
	};
}
const addContestant = success =>{
	return {
		type: actionTypes.ADD_CONTESTANT,
		success: success
	};
}
export const addContestantRequest = (categoryFakeId, contestantData) =>{
	return dispatch =>{
		UserService.postContestant(categoryFakeId, contestantData)
			.then(response=>{
				if(response.status === 200){ dispatch(addContestant(true)); }
			}).catch(err=>{console.log(err); dispatch(addContestant(false)); });
	}
}

export const editContestantInit = () =>{
	return {
		type: actionTypes.EDIT_CONTESTANT_INIT
	};
}
const editContestant = success =>{
	return {
		type: actionTypes.EDIT_CONTESTANT,
		success: success
	};
}
export const editContestantRequest = (categoryFakeId, contestantFakeId, categoryData) =>{
	return dispatch =>{
		UserService.putContestant(categoryFakeId, contestantFakeId, categoryData)
			.then(response=>{
				if(response.status === 201) { dispatch(editContestant(true)); }
			}).catch(err=>{console.log(err); dispatch(editContestant(false))});
	}
}

const getContestant = contestant =>{
	return {
		type: actionTypes.GET_CONTESTANT,
		contestant: contestant
	};
}
export const getContestantRequest = (categoryFakeId, contestantFakeId) =>{
	return dispatch =>{
		new Promise((resolve, reject)=>{
			UserService.getContestant(categoryFakeId, contestantFakeId)
				.then(response=>{
					let contestant = response.data.contestant;
	                contestant.img = UserService.updateImgURL(contestant.img);
					resolve(contestant);
				}).catch(err=>reject(err));
		}).then(contestant=>{
			dispatch(getContestant(contestant));
		}).catch(err=>{
			console.log(err);
		});
	};
}

const voteContestant = success =>{
	return {
		type: actionTypes.VOTE_CONTESTANT,
		success: success
	};
}
export const voteContestantRequest = (categoryFakeId, contestantFakeId) =>{
	return dispatch =>{
		UserService.voteContestant(categoryFakeId, contestantFakeId)
			.then(response=>{
				if(response.status === 201) { dispatch(voteContestant(true)); }
			}).catch(err=>{console.log(err); dispatch(voteContestant(false))});
	}
}