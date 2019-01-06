import React from 'react';

export default props => {
  return (
    <label className="btn btn-link">
      <input
        type="checkbox"
        onChange={props.updateCheckbox}
        checked={props.isChecked || false}
      />
      <div>{props.text}</div>
    </label>
  );
};
