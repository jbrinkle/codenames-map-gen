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
          <img className="logo" src="" alt="placeholder for logo"/>
        </header>
        { this.state.showPopup && 
          // <Popup onClose={this.closePopup.bind(this)} title={'New...'} successLabel={'Generate'} />
          <SetupPopup onClose={this.setupPopupClosed.bind(this)} />
        }
        <div className="mapgridHost">
          {/* <Toggle left={'1-Team'} leftDesc={'2-player "Duet" mode'}
                  right={'2-Team'} rightDesc={'Traditional mode for 4+ players'}
                  value={this.state.teamCount}
                  setValue={toggleTeamCount}
                  />
          <NumUpDown setValue={setMyNumHandler} label={'setting'} value={this.state.myNum} /> */}
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
