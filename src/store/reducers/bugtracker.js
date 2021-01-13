import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialState = {};
const reducer = (state= initialState, action) => {
	switch (action.type) {
    case actionTypes.CREATE_TASK_INIT:
      return updateObject(state, { createTaskSuccess: false });
		case actionTypes.CREATE_TASK:
      return updateObject(state, { createTaskSuccess: action.success });

    case actionTypes.UPDATE_TASK_INIT:
      return updateObject(state, { updateTaskSuccess: false });
    case actionTypes.UPDATE_TASK:
      return updateObject(state, { updateTaskSuccess: action.success });

    case actionTypes.DELETE_ONE_TASK_INIT:
      return updateObject(state, { deleteOneTaskSuccess: false });
    case actionTypes.DELETE_ONE_TASK:
      return updateObject(state, { deleteOneTaskSuccess: action.success });

    case actionTypes.DELETE_MULTIPLE_TASK_INIT:
      return updateObject(state, { deleteMultipleTaskSuccess: false });
    case actionTypes.DELETE_MULTIPLE_TASK:
      return updateObject(state, { deleteMultipleTaskSuccess: action.success });

    case actionTypes.GET_ALL_TASKS_INIT:
      return updateObject(state, { tasks: [] });
    case actionTypes.GET_ALL_TASKS:
      return updateObject(state, { tasks: action.tasks });

    case actionTypes.GET_TASK_INIT:
      return updateObject(state, { task: null });
    case actionTypes.GET_TASK:
      return updateObject(state, { task: action.task });

    case actionTypes.GET_ALL_LISTS_INIT:
      return updateObject(state, { lists: [] });
    case actionTypes.GET_ALL_LISTS:
      return updateObject(state, { lists: action.lists});
    default:
			return state;
	}
}

export default reducer;