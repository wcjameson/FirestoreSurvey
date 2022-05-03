import React from "react";
import PropTypes from "prop-types";


function SurveyDetail(props) {
  const { survey, onClickingDelete } = props;

  return (
    <React.Fragment>
      <h1>{survey.name}</h1>
      <button onClick={props.onClickingEdit}>Update Survey</button>
      <button onClick={() => props.onClickingDelete(survey.id)}>Delete Survey</button>
    </React.Fragment>
  )
}

SurveyDetail.propTypes = {
  survey: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default SurveyDetail;