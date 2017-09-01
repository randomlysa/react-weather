import React, { Component } from 'react';
import { clearStorage } from '../manageLocalStorage';

export default class Footer extends Component {
    render() {
        return (
            <div className="row">
              <div className="col">
                  <button onClick={clearStorage} className="btn btn-danger btn-sm">Delete All Cities / Clear localstorage)</button>
                  &nbsp; (This may be necessary if you are using an older version of this app.)
              </div>
            </div>
        );
    }
}
