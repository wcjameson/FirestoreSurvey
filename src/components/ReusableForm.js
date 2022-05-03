import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>

        <input
          type='text'
          name='name'
          placeholder='Survey Name' />
        <input
          type='text'
          name='question1'
          placeholder='question1' />
        <textarea
          name='answer1'
          placeholder='answer1' />
        <input
          type='text'
          name='question2'
          placeholder='question2' />
        <textarea
          name='answer2'
          placeholder='answer2' />
        <input
          type='text'
          name='question3'
          placeholder='question3' />
        <textarea
          name='answer3'
          placeholder='answer3' />
          
        <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;