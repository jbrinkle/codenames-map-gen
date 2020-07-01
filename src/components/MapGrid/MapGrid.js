import React from 'react';
import './MapGrid.css';
import MapGridCell from './MapGridCell/MapGridCell';

class MapGrid extends React.Component {
  /*
    Props:
    - data <string[][]>: identifiers for each cell ( 'a' = assassin, 'b' = bystander, '#' = team# )
    - teamData <object>: contains information on number of teams and who is first
  */

  defaultConfig() {
    return {
      'assassin': 'assassin',
      'bystander': 'bystander',
      'team1': 'triangle',
      'team2': 'circle',
      'team3': 'square'
    };
  }

  getTeamName(shorthand, teamcount) {
    const teamId = shorthand.toString().toLowerCase();
    switch (teamId) {
      case '0':
      case 'a':
        return 'assassin';
      case 'b':
        return 'bystander';
      case '2':
        return 'team2';
      default:
        return (teamcount === 2) ? 'team3' : 'team1'
    }
  }

  render() {
    let { data = [], teamData = { count: 0, first: 0 } } = this.props;
    let config = this.defaultConfig();

    if (!data.length) {
      data = Array.from(Array(5).keys()).map(r => 
          Array.from(Array(5).keys()).map(c => 'a')
        );
      config = { 'assassin': 'none' }
    }

    const firstTurnStyle = {
      margin: '0 auto',
      width: '50%'
    }

    return <React.Fragment>
        <div className="gridHeader">
          <MapGridCell cellLocation={firstTurnStyle} teamname={this.getTeamName(teamData.first, teamData.count)}/>
        </div>
        <div className="grid">
        { data.map((rowData, rowIndex) => {

            return rowData.map((cellData, colIndex) => {
              const teamName = this.getTeamName(cellData, teamData.count);
              const teamIcon = config[teamName] || teamName;

              const nextCellStyle = {
                gridColumn: `${colIndex + 1} / ${colIndex + 1}`,
                gridRow: `${rowIndex + 1} / ${rowIndex + 1}`
              }

              return <MapGridCell
                key={`${rowIndex + 1}-${colIndex + 1}`}
                cellLocation={nextCellStyle}
                teamname={teamName}
                teamicon={teamIcon} />
            })
          })
        }
        </div>
      </React.Fragment>
  }
}

export default MapGrid;