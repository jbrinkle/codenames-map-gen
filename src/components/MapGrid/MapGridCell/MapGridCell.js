import React from 'react';
import '../MapGrid.css';

class MapGridCell extends React.Component {
  /*
    Props:
    - teamname <string>: name of the team (e.g. "team1" or "team2" etc)
    - teamicon <string>: identifier for the icon to display
    - cellLocation <object>: contains CSS keys and values
  */
  render() {
    return <div className={"gridcell " + this.props.teamname} style={this.props.cellLocation}>
        <svg className="gridicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 49">
          <g fill="#FFFFFF88">
          {
            {
              'circle': <circle cx="25" cy="25" r="20"/>,
              'square': <rect x="4" y="4" width="41" height="41"/>,
              'triangle': <polygon points="25,4 45,45 4,45"/>,
              'bystander': <line x1="4" y1="25" x2="45" y2="25" strokeWidth="8" stroke="#FFFFFF88"/>,
              'assassin': <React.Fragment>
                <line x1="4" y1="4" x2="45" y2="45" strokeWidth="4" stroke="#FFFFFF88"/>
                <line x1="4" y1="45" x2="45" y2="4" strokeWidth="4" stroke="#FFFFFF88"/>
              </React.Fragment>
            }[this.props.teamicon]
          }
          </g>
        </svg>
      </div>
  }
}

export default MapGridCell;
