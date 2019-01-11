import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteForecast } from '../Cities/actions-forecast';
import { deleteCity } from '../Cities/actions-weather';
import Modal from 'react-modal';
import MaterialIcon from 'material-icons-react';
import styled from 'styled-components';

import { saveState } from '../../helpers/manage-localStorage';
import Option from '../../components/option';

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

const StyledFooter = styled.div`
  text-align: right;
`;

const SettingsMenu = styled.div`
  position: relative;
`;

/* https://www.w3schools.com/howto/howto_css_dropup.asp */
const SettingsMenuContent = styled.div`
  position: absolute;
  visibility: hidden;
  bottom: 75px;
  right: 0px;
  padding: 25px;
  background: #fff;
  border: solid 1px #ddd;
  transition: all 0.2s;

  :hover {
    display: block;
    visibility: visible;
  }
`;

const ButtonIconSettings = styled.button`
  padding: 25px;
  cursor: pointer;
  opacity: 0.4;
  transition: all 0.2s ease-in;
  border: none;
  background: none;

  :hover {
    opacity: 1;
  }

  :hover ~ .openOnHover {
    display: block;
    visibility: visible;
  }
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
      this.props.deleteForecast(city.id);
    });
    saveState('weather', '');
  }

  // Putting the footer at the bottom helps the menu to show fully (it opens up)
  render() {
    return (
      <StyledFooter className="row fixed-bottom">
        <div className="col">
          <StyledModal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Delete all cities"
            appElement={document.getElementById('app')}
          >
            <h3>Delete All Cities?</h3>
            <button className="btn btn-danger" onClick={this.deleteAllCities}>
              Delete
            </button>
            <button className="btn btn-light" onClick={this.closeModal}>
              Cancel
            </button>
          </StyledModal>
          <SettingsMenu>
            <ButtonIconSettings>
              <MaterialIcon icon="settings" size="medium" />
            </ButtonIconSettings>
            <SettingsMenuContent className="col-12 col-sm-12 col-md-4 openOnHover">
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
            </SettingsMenuContent>
          </SettingsMenu>
        </div>
      </StyledFooter>
    );
  }
}

function mapStateToProps(state) {
  return { cities: state.weather };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteCity, deleteForecast }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
