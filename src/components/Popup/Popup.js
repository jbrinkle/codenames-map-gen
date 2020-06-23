import React from 'react';
import './Popup.css';

class Popup extends React.Component {
  /*
    Props:
    - title <string>: title of the popup dialog
    - successLabel <string>: caption on the Ok! button
    - onClose <func>: sends an indicator of whether the dialog was cancelled
  */
  state = {
    closing: false
  }

  static FadeIn = {
    animationName: 'fadein',
    animationDuration: '.5s',
    animationFillMode: 'forwards'
  }
  static FadeOut = {
    animationName: 'fadeout',
    animationDuration: '.5s',
    animationFillMode: 'forwards'
  }
  static SlideIn = {
    animationName: 'slidein',
    animationDuration: '.5s',
    animationFillMode: 'forwards'
  }
  static SlideOut = {
    animationName: 'slideout',
    animationDuration: '.5s',
    animationFillMode: 'forwards'
  }

  cancel() {
    this.setState({closing: true})
    setTimeout(() => this.props.onClose(true), 500);
  }

  ok() {
    this.setState({closing: true})
    setTimeout(() => this.props.onClose(false), 500);
  }

  render() {
    return <div className="popupFullScreen" style={this.state.closing ? Popup.FadeOut : Popup.FadeIn}>
      <div className="popup" style={this.state.closing ? Popup.SlideOut : Popup.SlideIn}>
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