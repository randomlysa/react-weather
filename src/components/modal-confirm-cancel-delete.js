import React, { Component } from 'react';
import $ from 'jquery';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteCity } from '../actions'

class ConfirmDelete extends Component {
    cancelDelete(e) {
        const id = e.target.id;
        // Show the 'x' button.
        $(`#btn-delete-${id}`).css('display', 'block');
        // Hide the div with buttons to confirm/cancel deleting.
        $(`#div-delete-${id}`).fadeOut();
    }

    delete(e) {
        const id = e.target.id;
        // Hide the 'x' button.
        $(`#btn-delete-${id}`).fadeOut();
        // Hide the div with buttons to confirm/cancel deleting.
        $(`#div-delete-${id}`).fadeOut();
        this.props.deleteCity(e.target.id);
    }

    render() {
        return (
            <div className="confirm-delete" id={`div-delete-${this.props.id}`}>
                <br />
                Delete {this.props.name}?
                <br />
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={this.delete.bind(this)}
                    id={this.props.id}
                >
                    Yes
                </button>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={this.cancelDelete}
                    id={this.props.id}
                >
                    No
                </button>


            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    // Assign all actions (import * as actionCreators) to props.actions
    return bindActionCreators({ deleteCity }, dispatch)
}

export default connect(null, mapDispatchToProps)(ConfirmDelete)
