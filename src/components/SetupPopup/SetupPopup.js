import React from 'react';
import './SetupPopup.css';
import Popup from '../Popup/Popup';
import Toggle from '../Toggle/Toggle';
import NumUpDown from '../NumUpDown/NumUpDown';
import MapGridCell from '../MapGrid/MapGridCell/MapGridCell';

class SetupPopup extends React.Component {
  /*
    Props:
    - init <object>: initial configuration data
    - onClose <func>: sends state when popup not cancelled
  */

  constructor(props) {
    super(props);
    this.state = {
      team: {
        count: 2,
        first: 1
      },
      dimensions: {
        width: 5,
        height: 5
      },
      bystandersCount: 7,
      assassinsCount: 1,

      // merge any settings passed in
      ...props.init
    }
  }

  updateTeamCount(newTeamCount) {
    const newTeam = { ...this.state.team };
    newTeam.count = newTeamCount;
    this.setState({ team: newTeam });
  }

  updateFirstTeam(newFirstTeam) {
    const newTeam = { ...this.state.team };
    newTeam.first = newFirstTeam;
    this.setState({ team: newTeam });
  }

  updateBoardWidth(newBoardWidth) {
    const newDim = { ...this.state.dimensions };
    newDim.width = newBoardWidth;
    this.setState({ dimensions: newDim });
  }

  updateBoardHeight(newBoardHeight) {
    const newDim = { ...this.state.dimensions };
    newDim.height = newBoardHeight;
    this.setState({ dimensions: newDim });
  }

  updateBystanderCount(newBystanderCount) {
    this.setState({ bystandersCount: newBystanderCount });
  }

  updateAssassinCount(newAssassinCount) {
    this.setState({ assassinsCount: newAssassinCount });
  }

  updateUpperBounds(newState) {
    const boardCellCount = this.state.dimensions.width * this.state.dimensions.height;
    const minCodePieces = this.state.team.count === 1 ? 1 : 3;

    newState.bystanders.upperBound = boardCellCount - minCodePieces - newState.assassin.count;
    newState.assassin.upperBound = boardCellCount - minCodePieces - newState.bystanders.count;

    this.setState(newState);
  }

  closePopup(isCancel) {
    if (this.props.onClose) {
      this.props.onClose(isCancel ? null : this.state);
    }
  }

  render() {

    // upper bounds
    const boardCellCount = this.state.dimensions.width * this.state.dimensions.height;
    const minCodePieces = this.state.team.count === 1 ? 1 : 3;
    const bystanderUpperBound = boardCellCount - minCodePieces - this.state.assassinsCount;
    const assassinUpperBound = boardCellCount - minCodePieces - this.state.bystandersCount;

    // team indicator style
    const teamIndicatorStyle = {
      width: "14px",
      height: "14px"
    };

    // calculate summary
    let assassinsCount = this.state.assassinsCount;
    let bystandersCount = this.state.bystandersCount;
    let team1count, team2count;
    if (this.state.team.count === 2) {
      if ((boardCellCount - assassinsCount - bystandersCount) % 2 !== 1) {
        bystandersCount++;
      }
      team1count = team2count = Math.floor((boardCellCount - bystandersCount - assassinsCount) / 2);
      team1count += (this.state.team.first === 1 ? 1 : 0);
      team2count += (this.state.team.first === 2 ? 1 : 0);
    } else {
      team1count = boardCellCount - bystandersCount - assassinsCount;
    }

    return <Popup onClose={this.closePopup.bind(this)} title={'New Map...'} successLabel={'Generate'}>
        <div className="spacerTB">
          <Toggle left={'1-Team'} leftDesc={'2-player "Duet" mode'}
                right={'2-Team'} rightDesc={'Traditional mode for 4+ players'}
                value={this.state.team.count}
                setValue={this.updateTeamCount.bind(this)}
                /></div>
        { this.state.team.count === 2 && 
          <div className="spacerTB">
            <Toggle left={'Blue'} leftDesc={'Blue first'}
                    right={'Red'} rightDesc={'Red first'}
                    value={this.state.team.first} setValue={this.updateFirstTeam.bind(this)}
                    /></div>}
        <div className="spacerTB spacerLR">
          <NumUpDown setValue={this.updateBoardWidth.bind(this)} label={'Board Width'} value={this.state.dimensions.width}
                     lowerBound={3} upperBound={8} increment={1} /></div>
        <div className="spacerTB spacerLR">
          <NumUpDown setValue={this.updateBoardHeight.bind(this)} label={'Board Height'} value={this.state.dimensions.height}
                     lowerBound={3} upperBound={8} increment={1} /></div>
        <div className="spacerTB spacerLR">
          <NumUpDown setValue={this.updateBystanderCount.bind(this)} label={'Min. Bystander Count'}
                     value={this.state.bystandersCount}
                     lowerBound={0} upperBound={bystanderUpperBound} increment={1} /></div>
        <div className="spacerTB spacerLR">
          <NumUpDown setValue={this.updateAssassinCount.bind(this)} label={'Assassin Count'}
                     value={this.state.assassinsCount}
                     lowerBound={0} upperBound={assassinUpperBound} increment={1} /></div>

        {/* SUMMARY TABLE */}
        <div className="spacerTB">
          <table><tbody>
            <tr>
              <td></td>
              <td>Board size ({this.state.dimensions.width}x{this.state.dimensions.height})</td>
              <td>{ boardCellCount }</td>
            </tr>
            { this.state.team.count === 2 &&
              <React.Fragment>
              <tr>
                <td><MapGridCell teamname={'team3'} cellLocation={teamIndicatorStyle}/></td>
                <td>Team 1 { this.state.team.first === 1 ? ' (first)' : '' }</td>
                <td>{ team1count }</td>
              </tr>
              <tr>
                <td><MapGridCell teamname={'team2'} cellLocation={teamIndicatorStyle}/></td>
                <td>Team 2 { this.state.team.first === 2 ? ' (first)' : '' }</td>
                <td>{ team2count }</td>
              </tr>
              </React.Fragment>
            }
            { this.state.team.count === 1 &&
              <tr>
                <td><MapGridCell teamname={'team1'} cellLocation={teamIndicatorStyle}/></td>
                <td>Team 1</td>
                <td>{ team1count }</td>
              </tr>
            }
            <tr>
              <td><MapGridCell teamname={'bystander'} cellLocation={teamIndicatorStyle}/></td>
              <td>Bystanders</td>
              <td>{ bystandersCount }</td>
            </tr>
            <tr>
              <td><MapGridCell teamname={'assassin'} cellLocation={teamIndicatorStyle}/></td>
              <td>Assassins</td>
              <td>{ assassinsCount }</td>
            </tr>
          </tbody></table>
        </div>
      </Popup>
  }
}

export default SetupPopup;