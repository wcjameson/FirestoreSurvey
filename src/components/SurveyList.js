import React from "react";
import Survey from "./Survey";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'


function SurveyList(props) {
  // The useFirestoreConnect() hook comes from react-redux-firebase.
  // allows us to listen for changes to Firestore without using an HOC in a class component.
  useFirestoreConnect([
    { collection: 'surveys' }
  ]);

  // The useSelector() hook comes from react-redux.
  // allows us to extract data from a Redux store.
  const surveys = useSelector(state => state.firestore.ordered.surveys);

  // react-redux-firebase also offers a useful isLoaded() function.
  // isLoaded() and isEmpty() from react-redux-firebase allow us to check if a collection has been retrieved from Firestore.
  if (isLoaded(surveys)) {

    return (
      <React.Fragment>
        <hr />
        {surveys.map((survey) => {
          return <Survey
            whenSurveyClicked={props.onSurveySelection}
            name={survey.name}
            question1={survey.question1}
            question2={survey.question2}
            question3={survey.question3}
            answer1={survey.answer1}
            answer2={survey.answer2}
            answer3={survey.answer3}
            // formattedWaitTime={survey.formattedWaitTime}
            id={survey.id}
            key={survey.id}
             />
        })}
      </React.Fragment>
    );
  }else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

SurveyList.propTypes = {
  // ticketList: PropTypes.object,
  onSurveySelection: PropTypes.func
};

export default SurveyList;