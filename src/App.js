import React from 'react';
import './App.css';
import './components/MapGrid/MapGridCell/MapGridCell'
import MapGrid from './components/MapGrid/MapGrid';
import SetupPopup from './components/SetupPopup/SetupPopup';
import { generateMap, serializeMapAndSettings, deserializeMapAndSettings } from './services/mapGeneration.service';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      setup: {},
      board: {}
    };
  }

  showPopup() {
    this.setState({
      showPopup: true
    })
  }

  setupPopupClosed(generationParams) {
    if (!generationParams) { return; } // user cancelled

    const map = generateMap(generationParams);
    // update uri fragment with serialized map data
    const serialized = serializeMapAndSettings(map);
    const uriFrag = encodeURIComponent(btoa(serialized));
    window.history.replaceState(null, 'Updated board', `#${uriFrag}`);

    // update UX
    this.setState({
      showPopup: false,
      setup: generationParams,
      board: {
        data: map.data,
        teamData: map.team
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="appHeader">
          <h1>
            <div className="line1">CODENAMES</div>
            <div className="line2">Map Generator</div>
          </h1>
        </header>
        { this.state.showPopup && 
          <SetupPopup onClose={this.setupPopupClosed.bind(this)} />
        }
        <div className="mapgridHost">
          {/* <MapGrid rowCount={this.state.board.boardHeight} data={this.state.board.data} firstTurn={this.state.board.firstTurn} /> */}
          <MapGrid data={this.state.board.data} teamData={this.state.board.teamData} />
        </div>
        
        <div className="commands">
          <button className="ok" onClick={() => this.showPopup()}>
            New Map...
          </button>
        </div>
      </div>
    );
  }
}

export default App;
