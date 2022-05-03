import React from "react";
import PropTypes from "prop-types";

function Survey(props){

  return(
    <React.Fragment>
      <div onClick = {() => props.whenSurveyClicked(props.id)}>
        <h3>{props.name}</h3>
        <p>{props.question1}</p>
        <p>{props.question2}</p>
      </div>
    </React.Fragment>
  )
}

Survey.propTypes = {
  name: PropTypes.string.isRequired
}

export default Survey;