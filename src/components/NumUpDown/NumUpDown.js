import React from 'react';
import './NumUpDown.css';

class NumUpDown extends React.Component {
  /*
    Props:
    - setValue <func>: call to update value
    - lowerBound <number>: minimum value
    - upperBound <number>: maximum value
    - value <number>: current value
    - increment <number>: the change amount per button click
    - label <string>: setting name
  */

  constructor(props) {
    super(props);
    this.lowerBound = props.lowerBound || 0;
    this.upperBound = props.upperBound || 25;
    this.increment = props.increment || 1;
  }

  attemptNewValue(newValue) {
    if (newValue <= this.upperBound && newValue >= this.lowerBound) {
      this.props.setValue(newValue);
    }
  }

  render() {
    return <div className="numUpDown">
      <button onClick={() => this.attemptNewValue(this.props.value - this.increment)}>
        <svg className="gridicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 49">
          <g fill="#FFFFFF88">
            <line x1="4" y1="25" x2="45" y2="25" strokeWidth="8" stroke="#FFFFFF"/>
          </g>
        </svg>
      </button>

      <div className="settingDisplay">
        <div className="settingName">{this.props.label}</div>
        <div className="settingValue">{this.props.value}</div>
      </div>

      <button onClick={() => this.attemptNewValue(this.props.value + this.increment)}>
        <svg className="gridicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 49">
          <g fill="#FFFFFF88">
            <line x1="4" y1="25" x2="45" y2="25" strokeWidth="8" stroke="#FFFFFF"/>
            <line x1="25" y1="4" x2="25" y2="45" strokeWidth="8" stroke="#FFFFFF"/>
          </g>
        </svg>
      </button>
    </div>
  }
}

export default NumUpDown;