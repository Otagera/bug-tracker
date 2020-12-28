import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

import { updateObject } from '../utility';
import * as actionTypes from '../actions/actionTypes';

const initialSTate = {
  faSocials: {
  	fb: faFacebook,
   	twitter: faTwitter,
   	insta: faInstagram,
   	website: faGlobe
  }
}

const reducer = (state= initialSTate, action) => {
	switch (action.type) {
    case actionTypes.ADD_COMPANY_INIT:
      return updateObject(state, { addCompanySuccess: false });
		case actionTypes.ADD_COMPANY:
      return updateObject(state, { addCompanySuccess: action.success });

    case actionTypes.REMOVE_COMPANY_INIT:
      return updateObject(state, { removeCompanySuccess: false });
    case actionTypes.REMOVE_COMPANY:
      return updateObject(state, { removeCompanySuccess: action.success, selectedCompany: null });

    case actionTypes.EDIT_COMPANY_INIT:
      return updateObject(state, { editCompanySuccess: false });
    case actionTypes.EDIT_COMPANY:
      return updateObject(state, { editCompanySuccess: action.success });

    case actionTypes.GET_COMPANIES:
      const updatedStateGetCompanies = { ...state };
      updatedStateGetCompanies.companies = action.companies;
      return updateObject(state, updatedStateGetCompanies);

    case actionTypes.GET_COMPANY:
      return updateObject(state, { selectedCompany: action.company });


    case actionTypes.ADD_COMPETITION_INIT:
      return updateObject(state, { addCompetitionSuccess: false });
    case actionTypes.ADD_COMPETITION:
      return updateObject(state, { addCompetitionSuccess: action.success });

    case actionTypes.REMOVE_COMPETITION_INIT:
      return updateObject(state, { removeCompetitionSuccess: false });
    case actionTypes.REMOVE_COMPETITION:
      return updateObject(state, { removeCompetitionSuccess: action.success });

    case actionTypes.EDIT_COMPETITION_INIT:
      return updateObject(state, { editCompetitionSuccess: false });
    case actionTypes.EDIT_COMPETITION:
      return updateObject(state, { editCompetitionSuccess: action.success });

    case actionTypes.GET_COMPETITIONS:
      return state;
    case actionTypes.GET_COMPETITION:
      return updateObject(state, { 
        selectedCompany: action.company,
        selectedCompetition: action.competition
      });
		

    case actionTypes.ADD_CATEGORY_INIT:
      return updateObject(state, { addCategorySuccess: false });
    case actionTypes.ADD_CATEGORY:
      return updateObject(state, { addCategorySuccess: action.success });

    case actionTypes.REMOVE_CATEGORY_INIT:
      return updateObject(state, { removeCategorySuccess: false });
    case actionTypes.REMOVE_CATEGORY:
      return updateObject(state, { removeCategorySuccess: action.success });

    case actionTypes.EDIT_CATEGORY_INIT:
      return updateObject(state, { editCategorySuccess: false });
    case actionTypes.EDIT_CATEGORY:
      return updateObject(state, { editCategorySuccess: action.success });

    case actionTypes.GET_CATEGORIES:
      return state;
    case actionTypes.GET_CATEGORY:
      return updateObject(state, { 
        selectedCompany: action.company,
        selectedCompetition: action.competition,
        selectedCategory: action.category
      });
    
    
    case actionTypes.ADD_CONTESTANT_INIT:
      return updateObject(state, { addContestantSuccess: false });
    case actionTypes.ADD_CONTESTANT:
      return updateObject(state, { addContestantSuccess: action.success });

    case actionTypes.REMOVE_CONTESTANT_INIT:
      return updateObject(state, { removeContestantSuccess: false });
    case actionTypes.REMOVE_CONTESTANT:
      return updateObject(state, { removeContestantSuccess: action.success });

    case actionTypes.EDIT_CONTESTANT_INIT:
      return updateObject(state, { editContestantSuccess: false });
    case actionTypes.EDIT_CONTESTANT:
      return updateObject(state, { editContestantSuccess: action.success });

    case actionTypes.GET_CONTESTANT:
      return updateObject(state, { selectedContestant: action.contestant });

    case actionTypes.VOTE_CONTESTANT:
      return updateObject(state, { voteContestantSuccess: action.success });
    default:
			return state;
	}
}

export default reducer;