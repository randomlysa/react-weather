import React, { Component } from 'react';

export default class CityList extends Component {
  render() {
    const cityList = this.props.cityList;
    let renderItems;
    if (cityList) {
      renderItems = (
        <div className="row">

        </div>
      )
    } else renderItems = '';

    return renderItems;
  } // render
} // class CityList
