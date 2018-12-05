import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCity } from '../actions/index';
import Modal from 'react-modal';
import MaterialIcon from 'material-icons-react';

import { saveState } from '../manageLocalStorage';

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };

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
          <Modal
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
          </Modal>
          <div className="settings-menu">
            <button className="icon-settings">
              <MaterialIcon icon="settings" size="medium" />
            </button>
            <div className="settings-menu__content">
              <button className="btn btn-link" onClick={this.openModal}>
                Delete All Cities
              </button>
              <p>
                <label className="btn btn-link">
                  <input
                    type="checkbox"
                    checked={this.props.checkBoxChecked}
                    onChange={this.props.updateCheckbox}
                  />
                  Use Swipe to Delete
                </label>
              </p>
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
