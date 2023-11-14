import React from 'react';
import './App.css';
import LengthSetting from './LengthSetting';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasStarted: false
    }
  }

  componentDidMount() {
    this.setState({
      hasStarted: false
    })
  }

  render() {
    return (
      <div className="App">
        <div className='Title'>
          25+5 Clock
        </div>

        <div className='Settings'>
          <LengthSetting name="Break" init="5" hasStarted={this.state.hasStarted} />
          <LengthSetting name="Session" init="25" hasStarted={this.state.hasStarted} />
        </div>

        <div className='Session'>
          <p>Session</p>

        </div>

        <div className='controls'>
          <i>Start&Pause</i>
          <i>Reset</i>
        </div>
      </div>
    );
  }
}

export default App;
