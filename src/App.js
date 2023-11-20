import React from 'react';
import './App.css';
import LengthSetting from './LengthSetting';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      hasStarted: false,
      playpause: 'play'
    };

    this.reset = this.reset.bind(this)
    this.startstop = this.startstop.bind(this)
  }

  componentDidMount() {
    this.reset();
  }

  reset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      hasStarted: false
    })
  }

  startstop() {
    this.setState(state => ({
      hasStarted: true,
      playpause: state.playpause === 'play' ? 'pause' : 'play'
    }))
  }

  render() {
    return (
      <div id="app">
        <div className='main-title'>
          25+5 Clock
        </div>

        <LengthSetting name="Break" init={this.state.breakLength} hasStarted={this.state.hasStarted} />
        <LengthSetting name="Session" init={this.state.sessionLength} hasStarted={this.state.hasStarted} />

        <div className='timer'>
          <div className='timer-wrapper'>
            <p id="timer-label">Session</p>
            <p id="time-left"></p>
            <audio id="beep" src="https://samplelib.com/lib/preview/mp3/sample-9s.mp3"></audio>
          </div>

          <div className='timer-control'>
            <button>
              <i id="start_stop" className={`fa fa-${this.state.playpause} fa-2x`} onClick={e => this.startstop()}></i>
            </button>
            <button>
              <i id="reset" onClick={e => this.reset()} className='fa fa-refresh fa-2x'></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
