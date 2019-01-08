import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCity } from '../actions/index';
import Modal from 'react-modal';
import MaterialIcon from 'material-icons-react';
import styled from 'styled-components';

import { saveState } from '../manageLocalStorage';
import Option from '../components/option';

const StyledModal = styled(Modal)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: solid 2px #000;
  padding: 30px;
  background: #fff;
  text-align: center;
`;

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

    this.optionsList = [
      { option: 'useSwipeToDelete', text: 'Use Swipe To Delete' },
      { option: 'showFetched', text: 'Show Fetched' },
      { option: 'showUpdated', text: 'Show Updated' },
      { option: 'showCelcius', text: 'Show Celcius' },
      { option: 'showFahrenheit', text: 'Show Fahrenheit' },
      { option: 'showHumidity', text: 'Show Humidity' },
      { option: 'showSunrise', text: 'Show Sunrise' },
      { option: 'showSunset', text: 'Show Sunset' }
    ];

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.deleteAllCities = this.deleteAllCities.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  deleteAllCities() {
    this.setState({ modalIsOpen: false });
    this.props.cities.map(city => {
      this.props.deleteCity(city.id);
    });
    saveState();
  }

  render() {
    return (
      <div className="row row--footer">
        <div className="col">
          <StyledModal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Delete all cities"
            appElement={document.getElementById('app')}
            className="modal--delete"
          >
            <h3>Delete All Cities?</h3>
            <button className="btn btn-danger" onClick={this.deleteAllCities}>
              Delete
            </button>
            <button className="btn btn-light" onClick={this.closeModal}>
              Cancel
            </button>
          </StyledModal>
          <div className="settings-menu">
            <button className="icon-settings">
              <MaterialIcon icon="settings" size="medium" />
            </button>
            <div className="settings-menu__content col-12 col-sm-12 col-md-3">
              <button className="btn btn-danger" onClick={this.openModal}>
                Delete All Cities
              </button>

              {this.optionsList.map(option => (
                <Option
                  text={option.text}
                  key={option.option}
                  isChecked={this.props.checkBoxChecked[option.option]}
                  updateCheckbox={this.props.updateCheckbox}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { cities: state.weather };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteCity }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
