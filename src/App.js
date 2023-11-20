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
      playpause: 'play',
      timerName: 'Session'
    };

    this.reset = this.reset.bind(this);
    this.startpause = this.startpause.bind(this);
    this.breakLengthChanged = this.breakLengthChanged.bind(this);
    this.sessionLengthChanged = this.sessionLengthChanged.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.currentCountDown = null;
    this.audioElement = document.getElementById('beep');
  }

  componentDidMount() {
    this.reset();
  }

  reset() {
    this.audioElement.pause();
    this.audioElement.currentTime = 0;

    this.setState({
      breakLength: 5,
      sessionLength: 25,
      hasStarted: false,
      playpause: 'play',
      countDown: 25 * 60,
      timerName: 'Session'
    });

    this.clearCountDown();
  }

  onTimesUps() {
    this.audioElement.play();
    this.clearCountDown();
    this.swap();
    this.creatCountDown();
  }

  startpause() {
    this.setState(state => ({
      hasStarted: true,
      playpause: state.playpause === 'play' ? 'pause' : 'play'
    }))

    this.creatCountDown();
  }

  creatCountDown() {
    if (!this.currentCountDown) {

      this.currentCountDown = setInterval(() => {
        if (this.state.playpause === 'pause') {

          if (this.state.countDown === 0) {
            this.onTimesUps();

          }
          else {
            this.setState(state => ({
              countDown: state.countDown - 1
            }))
          }
        }
      }, 1000)
    }
  }

  swap() {
    this.setState(state => ({
      timerName: state.timerName === 'Session' ? 'Break' : 'Session',
      countDown: state.timerName === 'Session' ? state.breakLength * 60 : state.sessionLength * 60
    }))
  }

  clearCountDown() {
    if (this.currentCountDown) {
      clearInterval(this.currentCountDown);
      this.currentCountDown = null;
    }
  }

  formatTime(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${minutes}:${seconds}`;
  }

  breakLengthChanged(value) {
    this.setState({
      breakLength: value,
    });
  }

  sessionLengthChanged(value) {
    this.setState({
      sessionLength: value,
      countDown: value * 60
    });
  }

  render() {
    return (
      <div id="app">
        <div className='main-title'>
          25+5 Clock
        </div>

        <LengthSetting name="Break" init={this.state.breakLength} hasStarted={this.state.hasStarted} lengthChanged={this.breakLengthChanged} />
        <LengthSetting name="Session" init={this.state.sessionLength} hasStarted={this.state.hasStarted} lengthChanged={this.sessionLengthChanged} />

        <div className='timer'>
          <div className='timer-wrapper'>
            <div id="timer-label">{this.state.timerName}</div>
            <div id="time-left">{this.formatTime(this.state.countDown)}</div>
          </div>

          <div className='timer-control'>
            <button>
              <i id="start_stop" className={`fa fa-${this.state.playpause} fa-2x`} onClick={e => this.startpause()}></i>
            </button>
            <button>
              <i id="reset" onClick={e => this.reset()} className='fa fa-refresh fa-2x'></i>
            </button>
          </div>
        </div>
        <audio id="beep" src="https://samplelib.com/lib/preview/mp3/sample-9s.mp3"></audio>
      </div>
    );
  }
}

export default App;
