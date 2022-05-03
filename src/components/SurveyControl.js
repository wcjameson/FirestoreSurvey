import React from 'react';
import EditSurveyForm from './EditSurveyForm';
import NewSurveyForm from './NewSurveyForm';
import SurveyDetail from './SurveyDetail';
import SurveyList from './SurveyList';
import * as a from './../actions'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase'

class SurveyControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedSurvey: null,
      editing: false
    };
  }

  handleAddingNewSurveyToList = () => {
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }

  handleEditingSurveyInList = () => {
    this.setState({
      editing: false,
      selectedSurvey: null
    });
  }

  handleChangingSelectedSurvey = (id) => {
    this.props.firestore.get({ collection: 'surveys', doc: id }).then((survey) => {
      const firestoreSurvey = {
        name: survey.get('name'),
        question1: survey.get('question1'),
        question2: survey.get('question2'),
        question3: survey.get('question3'),
        answer1: survey.get('answer1'),
        answer2: survey.get('answer2'),
        answer3: survey.get('answer3'),
        id: survey.id
      }
      this.setState({ selectedSurvey: firestoreSurvey});
    });
  }

  handleDeletingSurvey = (id) => {
    this.props.firestore.delete({ collection: 'surveys', doc: id });
    this.setState({
      selectedSurvey: null
    });
  }

  handleEditClick = () => {
    this.setState({ editing: true });
  }

  handleClick = () => {
    if (this.state.selectedSurvey != null) {
      this.setState({
        selectedSurvey: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  render() {
    let currentlyVisibleState = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyVisibleState = <EditSurveyForm survey={this.state.selectedSurvey} onClickingEdit={this.handleEditingSurveyInList} />
      buttonText = "Return to Survey List";
    } else if (this.state.selectedSurvey != null) {
      currentlyVisibleState = <SurveyDetail survey={this.state.selectedSurvey} onClickingDelete={this.handleDeletingSurvey} onClickingEdit={this.handleEditClick} />
      buttonText = "Return to Survey List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewSurveyForm onNewSurveyCreation={this.handleAddingNewSurveyToList} />;
      buttonText = "Return to Survey List";
    } else {
      currentlyVisibleState = <SurveyList onSurveySelection={this.handleChangingSelectedSurvey} />;
      buttonText = "Add Survey";
    }

    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    // mainTicketList: state.mainTicketList, //mapping state slices to component props
    formVisibleOnPage: state.formVisibleOnPage
  }
}

SurveyControl = connect(mapStateToProps)(SurveyControl); ////This ensures the SurveyControl component has the mapStateToProps functionality when connect() redefines the component.

SurveyControl.propTypes = {
  formVisibleOnPage: PropTypes.bool
};

export default withFirestore(SurveyControl);