import React, { Component } from 'react';
import { clearStorage } from '../manageLocalStorage';

import MaterialIcon, { colorPalette } from 'material-icons-react';

export default class Footer extends Component {
  render() {
    return (
      <div className="row row--footer">
        <div className="col">
          <span className="icon-settings">
            <MaterialIcon icon="settings" size="medium" />
          </span>
        </div>
      </div>
    );
  }
}

// <button onClick={clearStorage} className="btn btn-danger btn-sm">
// Delete All Cities
// </button>
