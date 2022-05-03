import * as c from './../actions/ActionTypes';

const surveyListReducer =  (state = {}, action) => {
  const { id } = action;
  switch (action.type) {
    case c.DELETE_SURVEY:
      let newState = { ...state };
      delete newState[id];
      return newState;
    default:
      return state;
  }
};

export default surveyListReducer;