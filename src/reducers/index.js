import formVisibleReducer from './form-visible-reducer';
import surveyListReducer from './survey-list-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  formVisibleOnPage: formVisibleReducer,
  mainTicketList: surveyListReducer,
  firestore: firestoreReducer
});

export default rootReducer;