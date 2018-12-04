import React, { Component } from 'react';
import { connect } from 'react-redux';

class Notification extends Component {
  render() {
    console.log(this.props);
    if (this.props.notification) {
      return <div> {this.props.notification}</div>;
    } else return <div />;
  }
} // Notification

// Gets notification from state.
function mapStateToProps({ notification }) {
  return { notification };
}

export default connect(mapStateToProps)(Notification);
