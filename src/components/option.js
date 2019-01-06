import React from 'react';

export default props => {
  return (
    <div>
      <label className="btn btn-link">
        <input
          type="checkbox"
          onChange={props.updateCheckbox}
          checked={props.isChecked || false}
        />
        {props.text}
      </label>
    </div>
  );
};
