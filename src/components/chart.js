import _ from 'lodash';
import React from 'react';

// Function based component, doesn't need state.
export default (props) => {
    return (
        <span>
            {props.data} {props.units} {props.label}
        </span>
    )
}
