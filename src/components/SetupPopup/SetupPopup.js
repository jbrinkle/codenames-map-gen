import React from 'react';
import './SetupPopup.css';
import Popup from '../Popup/Popup';
import Toggle from '../Toggle/Toggle';
import NumUpDown from '../NumUpDown/NumUpDown';

class SetupPopup extends React.Component {
  /*
    Props:
    - onClose <func>: sends state when popup not cancelled
  */
  state = {
    teamCount: 2,
    boardWidth: 5,
    boardHeight: 5,
    bystanderPercentage: 30,
    assassinCount: 1
  }

  updateTeamCount(newTeamCount) {
    this.setState({ ...this.state, teamCount: newTeamCount });
  }

  updateBoardWidth(newBoardWidth) {
    this.setState({ ...this.state, boardWidth: newBoardWidth });
  }

  updateBoardHeight(newBoardHeight) {
    this.setState({ ...this.state, boardHeight: newBoardHeight });
  }

  updateBystanderPercent(newBystanderPercentage) {
    this.setState({ ...this.state, bystanderPercentage: newBystanderPercentage });
  }

  updateAssassinCount(newAssassinCount) {
    this.setState({ ...this.state, assassinCount: newAssassinCount });
  }

  closePopup(isCancel) {
    console.log(`Popup dialog closed, cancel=${isCancel}`);
    if (this.props.onClose) {
      this.props.onClose(isCancel ? null : this.state);
    }
  }

  render() {
    return <Popup onClose={this.closePopup.bind(this)} title={'New Map...'} successLabel={'Generate'}>
        <div className="spacerTB">
          <Toggle left={'1-Team'} leftDesc={'2-player "Duet" mode'}
                right={'2-Team'} rightDesc={'Traditional mode for 4+ players'}
                value={this.state.teamCount}
                setValue={this.updateTeamCount}
                /></div>
        <div className="spacerTB spacerLR">
          <NumUpDown setValue={this.updateBoardWidth} label={'Board Width'} value={this.state.boardWidth} /></div>
        <div className="spacerTB spacerLR">
          <NumUpDown setValue={this.updateBoardHeight} label={'Board Height'} value={this.state.boardHeight} /></div>
        <div className="spacerTB spacerLR">
          <NumUpDown setValue={this.updateBystanderPercent} label={'Bystander %'} value={this.state.bystanderPercentage} /></div>
        <div className="spacerTB spacerLR">
          <NumUpDown setValue={this.updateAssassinCount} label={'Assassin Count'} value={this.state.assassinCount} /></div>
      </Popup>
  }
}

export default SetupPopup;