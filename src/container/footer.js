import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCity } from '../actions/index';

import MaterialIcon, { colorPalette } from 'material-icons-react';

class Footer extends Component {
  toggleMenu() {
    const menu = document.getElementsByClassName('settings-menu__content')[0];
    menu.classList.toggle('settings-menu__content--display');
  }
  deleteAllCities() {
    this.props.cities.map(city => {
      // this.props.deleteCity(city.id)
    });
  }

  render() {
    return (
      <div className="row row--footer">
        <div className="col">
          <div className="settings-menu">
            <button className="icon-settings" onClick={this.toggleMenu}>
              <MaterialIcon icon="settings" size="medium" />
            </button>
            <div className="settings-menu__content">
              <p onClick={this.deleteAllCities.bind(this)}>Delete All Cities</p>
              <p>Disable Swipe to Delete</p>
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
