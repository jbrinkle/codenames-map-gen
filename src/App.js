import React from 'react';
import './App.css';
import './components/MapGrid/MapGridCell/MapGridCell'
import MapGrid from './components/MapGrid/MapGrid';
import SetupPopup from './components/SetupPopup/SetupPopup';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      mapData: []
    };
  }

  showPopup() {
    this.setState({
      ...this.state,
      showPopup: true
    })
  }

  setupPopupClosed(setupState) {
    console.log(setupState);
    this.setState({
      ...this.state,
      showPopup: false
    })
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
          <MapGrid data={this.state.mapData} />
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
