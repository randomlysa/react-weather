import _ from 'lodash';
import React from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine} from 'react-sparklines'

function average(data, type) {
    return _.round(_.sum(data)/data.length);
}

// Function based component, doesn't need state.
export default (props) => {
    return (
        <div>
            <Sparklines height={120} width={180} data={props.data}>
                <SparklinesLine color={props.color} />
                <SparklinesReferenceLine type="avg" />
            </Sparklines>
            <div>{average(props.data, props.type)} {props.units}</div>
        </div>
    )
}
