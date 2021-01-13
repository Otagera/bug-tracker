import * as actionTypes from './actionTypes';
import UserService from '../../services/UserService';

//Tasks
export const createTaskInit = () =>{
	return {
		type: actionTypes.CREATE_TASK_INIT
	};
}
const createTask = success =>{
	return {
		type: actionTypes.CREATE_TASK,
		success: success
	};
}
export const createTaskRequest = taskData =>{
	return dispatch =>{
		UserService.createTask(taskData)
			.then(response=>{
				console.log(response);
				if(false){
					if(response.status === 201) { dispatch(createTask(true)); }					
				}
			}).catch(err=>{
				console.log(err);
				if(false){
					dispatch(createTask(false));					
				}
			});
	}
}

export const updateTaskInit = () =>{
	return {
		type: actionTypes.UPDATE_TASK_INIT
	};
}
const updateTask = success =>{
	return {
		type: actionTypes.UPDATE_TASK,
		success: success
	};
}
export const updateTaskRequest = taskData =>{
	return dispatch =>{
		UserService.updateTask(taskData)
			.then(response=>{
				console.log(response);
				if(false){
					if(response.status === 201) { dispatch(updateTask(true)); }					
				}
			}).catch(err=>{
				console.log(err);
				if(false){
					dispatch(updateTask(false));					
				}
			});
	}
}

export const deleteOneTaskInit = () =>{
	return {
		type: actionTypes.DELETE_ONE_TASK_INIT
	};
}
const deleteOneTask = success =>{
	return {
		type: actionTypes.DELETE_ONE_TASK,
		success: success
	};
}
export const deleteOneTaskRequest = (idData) =>{
	return dispatch =>{
		UserService.deleteOneTask(idData)
			.then(response=>{
				console.log(response);
				if(false){
					if(response.status === 200) { dispatch(deleteOneTask(true)); }					
				}
			}).catch(err=>{
				console.log(err);
				if(false){
					dispatch(deleteOneTask(false));					
				}
			});
	}
}

export const deleteMultipleTaskInit = () =>{
	return {
		type: actionTypes.DELETE_MULTIPLE_TASK_INIT
	};
}
const deleteMultipleTask = success =>{
	return {
		type: actionTypes.DELETE_MULTIPLE_TASK,
		success: success
	};
}
export const deleteMultipleTaskRequest = (idsData) =>{
	return dispatch =>{
		UserService.deleteMultipleTask(idsData)
			.then(response=>{
				console.log(response);
				if(false){
					if(response.status === 200) { dispatch(deleteMultipleTask(true)); }					
				}
			}).catch(err=>{
				console.log(err);
				if(false){
					dispatch(deleteMultipleTask(false));					
				}
			});
	}
}

export const getAllTasksInit = () =>{
	return {
		type: actionTypes.GET_ALL_TASKS_INIT
	};
}
const getAllTasks = tasks =>{
	return {
		type: actionTypes.GET_ALL_TASKS,
		tasks: tasks
	};
}
export const getAllTasksRequest = () =>{
	return dispatch =>{
		UserService.getAllTasks()
			.then(response=>{
				//console.log(response);
				if(response.data.status){
					dispatch(getAllTasks(response.data.data.tasks));
				}
				if(false){
					if(response.status === 200) { dispatch((true)); }					
				}
			}).catch(err=>{
				console.log(err);
				if(false){
					dispatch(getAllTasks(null));					
				}
			});
	}
}

export const getTaskInit = () =>{
	return {
		type: actionTypes.GET_TASK_INIT
	};
}
const getTask = task =>{
	return {
		type: actionTypes.GET_TASK,
		task: task
	};
}
export const getTaskRequest = () =>{
	return dispatch =>{
		UserService.getTask()
			.then(response=>{
				console.log(response);
				if(false){
					if(response.status === 200) { dispatch(getTask(true)); }					
				}
			}).catch(err=>{
				console.log(err);
				if(false){
					dispatch(getTask(false));					
				}
			});
	}
}

//Lists
export const createListInit = () =>{
	return {
		type: actionTypes.CREATE_LIST_INIT
	};
}
const createList = success =>{
	return {
		type: actionTypes.CREATE_LIST,
		success: success
	};
}
export const createListRequest = taskData =>{
	return dispatch =>{
		UserService.createList(taskData)
			.then(response=>{
				console.log(response);
				if(false){
					if(response.status === 201) { dispatch(createList(true)); }					
				}
			}).catch(err=>{
				console.log(err);
				if(false){
					dispatch(createList(false));					
				}
			});
	}
}

export const updateListInit = () =>{
	return {
		type: actionTypes.UPDATE_LIST_INIT
	};
}
const updateList = success =>{
	return {
		type: actionTypes.UPDATE_LIST,
		success: success
	};
}
export const updateListRequest = taskData =>{
	return dispatch =>{
		UserService.updateList(taskData)
			.then(response=>{
				console.log(response);
				if(false){
					if(response.status === 201) { dispatch(updateList(true)); }					
				}
			}).catch(err=>{
				console.log(err);
				if(false){
					dispatch(updateList(false));					
				}
			});
	}
}

export const deleteOneListInit = () =>{
	return {
		type: actionTypes.DELETE_ONE_LIST_INIT
	};
}
const deleteOneList = success =>{
	return {
		type: actionTypes.DELETE_ONE_LIST,
		success: success
	};
}
export const deleteOneListRequest = (idData) =>{
	return dispatch =>{
		UserService.deleteOneList(idData)
			.then(response=>{
				console.log(response);
				if(false){
					if(response.status === 200) { dispatch(deleteOneList(true)); }					
				}
			}).catch(err=>{
				console.log(err);
				if(false){
					dispatch(deleteOneList(false));					
				}
			});
	}
}
/*
export const deleteMultipleTaskInit = () =>{
	return {
		type: actionTypes.DELETE_MULTIPLE_TASK_INIT
	};
}
const deleteMultipleTask = success =>{
	return {
		type: actionTypes.DELETE_MULTIPLE_TASK,
		success: success
	};
}
export const deleteMultipleTaskRequest = (idsData) =>{
	return dispatch =>{
		UserService.deleteMultipleTask(idsData)
			.then(response=>{
				console.log(response);
				if(false){
					if(response.status === 200) { dispatch(deleteMultipleTask(true)); }					
				}
			}).catch(err=>{
				console.log(err);
				if(false){
					dispatch(deleteMultipleTask(false));					
				}
			});
	}
}
*/
export const getAllListsInit = () =>{
	return {
		type: actionTypes.GET_ALL_LISTS_INIT
	};
}
const getAllLists = lists =>{
	return {
		type: actionTypes.GET_ALL_LISTS,
		lists: lists
	};
}
export const getAllListsRequest = () =>{
	return dispatch =>{
		UserService.getAllLists()
			.then(response=>{
				//console.log(response);
				if(response.data.status){
					dispatch(getAllLists(response.data.data.lists));
				}
			}).catch(err=>{
				console.log(err);
				if(false){
					dispatch(getAllLists(null));					
				}
			});
	}
}

export const getListInit = () =>{
	return {
		type: actionTypes.GET_LIST_INIT
	};
}
const getList = success =>{
	return {
		type: actionTypes.GET_LIST,
		success: success
	};
}
export const getListRequest = () =>{
	return dispatch =>{
		UserService.getList()
			.then(response=>{
				console.log(response);
				if(false){
					if(response.status === 200) { dispatch(getList(true)); }					
				}
			}).catch(err=>{
				console.log(err);
				if(false){
					dispatch(getList(false));					
				}
			});
	}
}