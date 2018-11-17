import React, { Component } from 'react';
import { clearStorage } from '../manageLocalStorage';

export default class Footer extends Component {
    render() {
        return (
            <div className="row row--footer">
              <div className="col">
                  <button
                    onClick={clearStorage}
                    className="btn btn-danger btn-sm"
                    >
                        Delete All Cities
                    </button>
              </div>
            </div>
        );
    }
}
