import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import PlayArrow from 'material-ui-icons/PlayArrow';
import FastForward from 'material-ui-icons/FastForward';
import Stop from 'material-ui-icons/Stop';
import Refresh from 'material-ui-icons/Refresh';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Sound from 'react-sound';
import ding from '../../sounds/DING.mp3'
import styles from "../../styles";

class Timer extends Component {
  constructor(props) {
    super();

    this.state = {
      seconds: this.minutesToSeconds(props.cycles[0]),
      timerInterval: null,
      soundStatus: 'STOPPED',
      cycleIndex: 0
    };

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.secondsToTime = this.secondsToTime.bind(this);
    this.handleSongPlaying = this.handleSongPlaying.bind(this);
    this.nextCycle = this.nextCycle.bind(this);
  }

  secondsToTime(secs){
    const hours = Math.floor(secs / (60 * 60));
    const divisor_for_minutes = secs % (60 * 60);
    const minutes = Math.floor(divisor_for_minutes / 60);
    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = Math.ceil(divisor_for_seconds);
    const timeString = this.formatNumber(hours) + ':' +
      this.formatNumber(minutes) + ':' + this.formatNumber(seconds);

    return timeString;
  }

  minutesToSeconds(minutes) {
    return( 60 * minutes );
  }

  componentDidMount() {
    let timeLeft = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeft });
  }

  componentWillReceiveProps(newProps) {
    const cyclesChanged = JSON.stringify(newProps.cycles) !== JSON.stringify(this.props.cycles);
    if (cyclesChanged) {
      const cycle = newProps.cycles[this.state.cycleIndex];
      const seconds = this.minutesToSeconds(cycle);
      const timeLeft = this.secondsToTime(seconds);
      this.setState({ seconds: seconds, time: timeLeft });
      this.stopTimer();
    }
  }

  startTimer() {
    if (this.state.timerInterval === null) {
      this.setState({ timerInterval: setInterval(this.countDown, 1000) });
    }
  }

  stopTimer() {
    clearInterval(this.state.timerInterval);
    this.setState({ timerInterval: null });
  }

  resetTimer() {
    this.stopTimer();
    const resetSeconds = this.minutesToSeconds(this.props.cycles[0]);
    this.setState({seconds: resetSeconds});
  }

  nextCycle(){
    const cycles = this.props.cycles;
    let cycleIndex = this.state.cycleIndex + 1;

    if(cycles.length === cycleIndex){
      cycleIndex = 0
    }

    let seconds = this.minutesToSeconds(this.props.cycles[cycleIndex]);
    this.setState({seconds: seconds, cycleIndex: cycleIndex});
  }

  formatNumber(number){
    return number > 9 ? "" + number : "0" + number;
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds === 0) {
      this.stopTimer();
      const cycleIndex = this.props.cycles[this.state.cycleIndex+1] ? (this.state.cycleIndex+1) : 0;
      this.setState({
        soundStatus: 'PLAYING',
        cycleIndex: cycleIndex,
        seconds: this.minutesToSeconds(this.props.cycles[cycleIndex])
      });
      const timer = this;
      setTimeout(function(){
        timer.startTimer();
      }, 1000);
    }
  }

  handleSongPlaying() {
    const timer = this;
    setTimeout(function(){
      timer.setState({soundStatus: 'STOPPED'});
    }, 900);
  }

  render() {
    const isTimerRunning = this.state.timerInterval;
    return(
      <div style={{marginBottom: 80}}>
        <div className='digital' style={styles.timer}>
          {this.secondsToTime(this.state.seconds)}
        </div>
        <br/>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col xs={4}>
            {
              isTimerRunning &&
              <div className='text-right'>
                <FloatingActionButton onClick={this.nextCycle} backgroundColor="#43a047">
                  <FastForward />
                </FloatingActionButton>
              </div>
            }
            {
              !isTimerRunning &&
              <div className='text-right'>
                <FloatingActionButton onClick={this.startTimer} backgroundColor="#43a047">
                  <PlayArrow />
                </FloatingActionButton>
              </div>
            }
          </Col>
          <Col xs={4}>
            <div className='text-center'>
              <FloatingActionButton onClick={this.stopTimer} backgroundColor="#e53935">
                <Stop />
              </FloatingActionButton>
            </div>
          </Col>
          <Col xs={4}>
            <div className='text-left'>
              <FloatingActionButton onClick={this.resetTimer} backgroundColor="#1e88e5">
                <Refresh />
              </FloatingActionButton>
            </div>
          </Col>
        </Row>
        <Sound
          url={ding}
          playStatus={this.state.soundStatus}
          playFromPosition={0}
          onPlaying={this.handleSongPlaying}
        />
      </div>
    );
  }
}


export default Timer;
