import React from 'react';
import './App.css';
import './components/MapGrid/MapGridCell/MapGridCell'
import MapGrid from './components/MapGrid/MapGrid';
import NumUpDown from './components/NumUpDown/NumUpDown';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      myNum: 8
    };
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
        myNum: newValue
      });
    }

    return (
      <div className="App">
        <div className="mapgridHost">
          <NumUpDown setValue={setMyNumHandler} label={'setting'} value={this.state.myNum} />
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
