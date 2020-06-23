import React from 'react';
import './Toggle.css';

const rightToggleCx = 53;
const leftToggleCx = 21;

const toggleCssNormal = 'toggleIndicator';
const toggleCssActive = 'toggleIndicatorActive';

class Toggle extends React.Component {
  /*
    Props:
    - setValue <func>: call to update value
    - value <number>: value indicating selection
    - left <string>: left title
    - leftDesc <string>: subtext for left
    - right <string>: right title
    - rightDesc <string>: subtext for right
  */
  constructor(props) {
    super(props);

    this.state = {
      toggleCssClassName: toggleCssNormal
    };
    this.toggleCx = rightToggleCx;
  }

  focusHandler(hasFocus) {
    this.setState({
      toggleCssClassName: hasFocus ? toggleCssActive : toggleCssNormal
    });
  }

  toggleState() {
    if (this.props.setValue) {
      const currentValue = this.props.value || 2;
      if (currentValue >= 2) this.props.setValue(1);
      else this.props.setValue(2);
    }
  }

  render() {
    if (this.props.value) {
      this.toggleCx = this.props.value <= 1 ? leftToggleCx : rightToggleCx;
    }

    return <div className="toggle">
      <div className="settingDisplay">
        <div className="settingName">{this.props.left}</div>
        <div className="settingSubtext">{this.props.leftDesc}</div>
      </div>
      
      <button onClick={() => this.toggleState()} onFocus={() => this.focusHandler(true)} onBlur={() => this.focusHandler(false)}>
        <svg className="gridicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 50">
          <g>
            <line x1="1" y1="25" x2="69" y2="25" strokeWidth="8" stroke="#555"/>
            <circle className={this.state.toggleCssClassName} cx={this.toggleCx} cy="25" r="20" strokeWidth="2" stroke="#666"/>,
          </g>
        </svg>
      </button>

      <div className="settingDisplay">
        <div className="settingName">{this.props.right}</div>
        <div className="settingSubtext">{this.props.rightDesc}</div>
      </div>
    </div>
  }
}

export default Toggle;