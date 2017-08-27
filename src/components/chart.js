import _ from 'lodash';
import React from 'react';

// Function based component, doesn't need state.
export default (props) => {
    return (
        <div>
            <div>{props.data} {props.units}</div>
        </div>
    )
}
