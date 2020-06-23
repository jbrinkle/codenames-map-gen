import React from 'react';
import './Popup.css';

class Popup extends React.Component {
  /*
    Props:
    - title <string>: title of the popup dialog
    - successLabel <string>: caption on the Ok! button
    - onClose <func>: sends an indicator of whether the dialog was cancelled
  */
  cancel() {
    this.props.onClose(true);
  }

  ok() {
    this.props.onClose(false);
  }

  render() {
    return <div className="popupFullScreen">
      <div className="popup">
        <header>
          <div className="title">{this.props.title}</div>
          <button className="cancel" onClick={() => this.cancel()}>
            <svg className="cancelx" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 49">
              <g>
                <line x1="4" y1="4" x2="45" y2="45" strokeWidth="4" stroke="#444"/>
                <line x1="4" y1="45" x2="45" y2="4" strokeWidth="4" stroke="#444"/>
              </g>
            </svg>
          </button>
        </header>
        <div className="content">
          {this.props.children}
        </div>
        <div className="commandFooter">
          <button className="ok" onClick={() => this.ok()}>
            {this.props.successLabel}
          </button>
        </div>
      </div>
    </div>
  }
}

export default Popup;