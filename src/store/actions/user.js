import * as actionTypes from './actionTypes';
import AuthService from '../../services/AuthService';

export const loginInit =()=>{
	return {
		type: actionTypes.LOGIN_INIT
	};
}
const login = (success, msg='') =>{
	return {
		type: actionTypes.LOGIN,
		success: success,
		errorMsg: msg
	};
}
export const loginRequest = loginData =>{
	return dispatch =>{
		AuthService.login(loginData)
			.then(response=>{
				//console.log(response);
    			if(response.data.status){
					dispatch(login(true));
    			}else{
					dispatch(login(false, response.data.msg));
    			}
			}).catch(err=>{
				console.log(err);
				if(err.response.status === 401){
					dispatch(login(false, err.response.data.message));
				}else{
					dispatch(login(false, 'Something went wrong'));
				}
			});
	}
}

export const signupInit =()=>{
	return {
		type: actionTypes.SIGNUP_INIT
	};
}
const signup = (success, msg='') =>{
	return {
		type: actionTypes.SIGNUP,
		success: success,
		errorMsg: msg
	};
}
export const signupRequest = signupData =>{
	return dispatch =>{
		AuthService.signup(signupData)
			.then(response=>{
				if(response.data.status){
					dispatch(signup(true));					
				}else {
					dispatch(signup(false, response.data.msg));
				}
			}).catch(err=>{
				console.log(err);
				if(err.response.status === 409){
					dispatch(signup(false, err.response.data.message));
				}else{
					dispatch(signup(false, 'Something went wrong'));
				}
			});
	}
}

const authenticateToken = (success, redirectPath='', msg='') =>{
	return {
		type: actionTypes.AUTHENTICATE_TOKEN,
		success: success,
		redirectPath: redirectPath,
		errorMsg: msg
	}
}
export const authenticateTokenRequest = token =>{
	return dispatch =>{
		AuthService.authenticateToken(token)
			.then(response=>{
				//console.log(response);
    			if(response.data.code === 200 && response.data.data.token){
    				localStorage.setItem('user', JSON.stringify({ token: response.data.data.token }));
    			}
				if(response.data.data && response.data.data.type === 'signup'){
					dispatch(authenticateToken(true, '/signup/enter-name'));
				}else if(response.data.data && response.data.data.type === 'login'){
					dispatch(authenticateToken(true, '/get-started'));
				}else if(response.data.code === 401){
					dispatch(authenticateToken(false, null, 'Sorry token has expired'));
				}
			})
			.catch(err=>{
				console.log(err);
				dispatch(authenticateToken(false, null, 'Something went wrong'))
			});
	}
}

export const updateNameInit =()=>{
	return {
		type: actionTypes.UPDATE_NAME_INIT
	};
}
const updateName = (success, msg='') =>{
	return {
		type: actionTypes.UPDATE_NAME,
		success: success,
		errorMsg: msg
	}
}
export const updateNameRequest = updateNameData =>{
	return dispatch =>{
		AuthService.updateName(updateNameData)
			.then(response=>{
				dispatch(updateName(true));
			})
			.catch(err=>{
				console.log(err);
				dispatch(updateName(false, 'Something went wrong'))
			});
	}
}

const logout = () =>{
	return {
		type: actionTypes.LOGOUT
	}
}
export const logoutTimer = () =>{
	return dispatch =>{
		setTimeout(()=>{
			AuthService.logout();
			dispatch(logout());
		}, 5000);
	}
}

export const checkUserAvaIlability = () =>{
	return {
		type: actionTypes.CHECK_USER_AVAILABLE,
		userAvaliable: AuthService.userAvailable()
	};
}