import React from 'react';
import './MapGrid.css';
import MapGridCell from './MapGridCell/MapGridCell';

class MapGrid extends React.Component {
  /*
    Props:
    - rowCount <number>: count of rows in the data
    - data <string[]>: identifiers for each cell ('a' = assassin, 'b' = bystander, '#' = team# )
    - config <object>: keys are teamnames; values are the icon used by the team
  */
  getTeamName(shorthand) {
    switch (shorthand.toLowerCase()) {
      case 'a':
        return 'assassin';
      case 'b':
        return 'bystander';
      default:
        return 'team' + shorthand;
    }
  }
  render() {
    let { rowCount, data, config } = this.props;

    if (!data.length) {
      data = Array.from(Array(25).keys()).map(v => 'a');
      config = { 'assassin': 'none' }
      rowCount = 5;
    }

    const colCount = data.length / rowCount;
    const isValidData = data.length % rowCount === 0;

    return <div className="grid">
      { !isValidData && 
        <div className="invalidData">
          Invalid Map Data
        </div>
      }
      { isValidData &&
        data.map((cellData, index) => {
          const teamName = this.getTeamName(cellData);
          const teamIcon = config[teamName] || teamName;
          console.log(`Data index=${index}, value=${cellData}, teamName=${teamName}, icon=${teamIcon}`);

          const ci = index % colCount + 1;
          const ri = Math.floor(index / colCount) + 1;
          const nextCellStyle = {
            gridColumn: `${ci} / ${ci}`,
            gridRow: `${ri} / ${ri}`
          }

          return <MapGridCell
            key={`${ri}-${ci}`}
            cellLocation={nextCellStyle}
            teamname={teamName}
            teamicon={teamIcon}
          />
        })
      }
      </div>
  }
}

export default MapGrid;