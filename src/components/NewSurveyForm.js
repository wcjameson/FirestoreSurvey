import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { useFirestore } from 'react-redux-firebase';

function NewSurveyForm(props) {

  // We add the useFirestore() hook to make Firestore available to our component.
  // This will allow us to use Firestore methods in the component.
  const firestore = useFirestore();

  function addSurveyToFirestore(event) {
    event.preventDefault();
    // We will still need our onNewTicketCreation() method to toggle between components - but it will no longer take an argument because it no longer handles creating a ticket.
    props.onNewSurveyCreation();
    return firestore.collection('surveys').add({
      name: event.target.name.value,
      question1: event.target.question1.value,
      question2: event.target.question2.value,
      question3: event.target.question3.value,
      answer1: event.target.answer1.value,
      answer2: event.target.answer2.value,
      answer3: event.target.answer3.value,
      timeOpen: firestore.FieldValue.serverTimestamp()
    });

  }

  return (
    <React.Fragment>
      <ReusableForm
        formSubmissionHandler={addSurveyToFirestore}
        buttonText="Add Survey" />
    </React.Fragment>
  );
}

NewSurveyForm.propTypes = {
  onNewTicketCreation: PropTypes.func
};

export default NewSurveyForm;