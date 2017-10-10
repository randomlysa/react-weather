import React, { Component } from 'react';
import { connect } from 'react-redux';

class ErrorMessage extends Component {
    render() {
        if (this.props.error) {
            return (
                <div>
                    {this.props.error} <br />
                    <a href="https://www.iso.org/obp/ui/">
                        Try searching for a country code >
                    </a>
                </div>
            ); // return
        } // if
        else {
            return (
                <div></div>
            );
        } // else
    } // render()
} // ErrorMessage

// Gets error from state.
function mapStateToProps({ error }) {
    return { error };
}

export default connect(mapStateToProps)(ErrorMessage)
