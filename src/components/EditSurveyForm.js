import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";
import { useFirestore } from 'react-redux-firebase';

function EditSurveyForm(props) {
  const firestore = useFirestore();
  const { survey } = props;

  function handleEditSurveyFormSubmission(event) {
    event.preventDefault();
    props.onClickingEdit();
    const propertiesToUpdate = {
      name: event.target.name.value,
      question1: event.target.question1.value,
      question2: event.target.question2.value,
      question3: event.target.question3.value,
      answer1: event.target.answer1.value,
      answer2: event.target.answer2.value,
      answer3: event.target.answer3.value
    }
    return firestore.update({ collection: 'surveys', doc: survey.id }, propertiesToUpdate)
  }
  return (
    <React.Fragment>
      <ReusableForm
      formSubmissionHandler={handleEditSurveyFormSubmission}
      buttonText="Update Survey" />
    </React.Fragment>
  )
}

EditSurveyForm.propTypes = {
  survey: PropTypes.object,
  onClickingEdit: PropTypes.func
}

export default EditSurveyForm;