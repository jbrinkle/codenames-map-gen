import React from 'react';
import './App.css';
import './components/MapGrid/MapGridCell/MapGridCell'
import MapGrid from './components/MapGrid/MapGrid';
import NumUpDown from './components/NumUpDown/NumUpDown';
import Toggle from './components/Toggle/Toggle';
import Popup from './components/Popup/Popup';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myNum: 8,
      teamCount: 2,
      showPopup: false
    };
  }

  showPopup() {
    this.setState({
      ...this.state,
      showPopup: true
    })
  }

  closePopup(isCancelled) {
    this.setState({
      ...this.state,
      showPopup: false
    })
  }

  render() {
    // const teamConfig = {
    //   team1: 'square',
    //   team2: 'circle'
    // }
    const mapData = []
                    // [ 'a', 'b', '1', '2', '1',
                    //   'b', 'b', '1', '2', '1',
                    //   'b', '1', '2', '1', 'b',
                    //   '1', '2', 'b', '1', '2',
                    //   '1', 'b', '1', '2', 'b' ]

    const setMyNumHandler = (newValue) => {
      this.setState({
        ...this.state,
        myNum: newValue
      });
    }

    const toggleTeamCount = (newTeamCount) => {
      console.log(`Setting teamcount to ${newTeamCount}`);
      this.setState({
        ...this.state,
        teamCount: newTeamCount
      })
    }

    return (
      <div className="App">
        { this.state.showPopup && 
          <Popup onClose={this.closePopup.bind(this)} title={'New...'} successLabel={'Generate'} />
        }
        <div className="mapgridHost">
          {/* <Toggle left={'1-Team'} leftDesc={'2-player "Duet" mode'}
                  right={'2-Team'} rightDesc={'Traditional mode for 4+ players'}
                  value={this.state.teamCount}
                  setValue={toggleTeamCount}
                  />
          <NumUpDown setValue={setMyNumHandler} label={'setting'} value={this.state.myNum} /> */}
          <button onClick={() => this.showPopup()}>Popup!</button>
          <MapGrid data={mapData} />
        </div>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
      </div>
    );
  }
}

export default App;
