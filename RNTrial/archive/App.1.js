import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight} from 'react-native';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// type Props = {};
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      default: null,
      isTimerStart: false,
      isStopwatchStart: false,
      timerDuration: 90000,
      resetTimer: false,
      resetStopwatch: false
    };
    this.startStopTimer = this.startStopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.startStopStopWatch = this.startStopStopWatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  startStopTimer() {
    this.setState({
      isTimerStart: !this.state.isTimerStart,
      resetTimer: false
    })
  }

  resetTimer() {
    this.setState({
      isTimerStart: false,
      resetTimer: true
    })
  }

  startStopStopWatch() {
    this.setState({
      isStopwatchStart: !this.state.isStopwatchStart,
      resetStopwatch: false
    })
  }

  resetStopwatch() {
    this.setState({
      isStopwatchStart: false,
      resetStopwatch: true
    })
  }

  getFormattedTime(time) {
    this.currentTime = time;
  }


  render() {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <View style={{flex:1, marginTop:32, alignItems:'center', justifyContent:'center'}}>
          <Stopwatch laps msecs
            start={this.state.isStopwatchStart}
            reset={this.state.resetStopwatch}
            options={options}
            getTime={this.getFormattedTime}
          />
          <TouchableHighlight onPress={this.startStopStopWatch}>
            <Text style={{fontSize: 20, marginTop: 10}}>
              {!this.state.isStopwatchStart ? "Start" : "STOP"}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.resetStopwatch}>
            <Text style={{fontSize: 20, marginTop: 10}}>RESET</Text>
          </TouchableHighlight>
        </View>
        <View style={{flex:1, marginTop:32, alignItems:'center', justifyContent:'center'}}>
          <Timer
            totalDuration={this.state.timerDuration} msecs
            start={this.state.isTimerStart}
            reset={this.state.resetTimer}
            options={options}
            handleFinish={handleTimerComplete}
            getTime={this.getFormattedTime}
          />
          <TouchableHighlight onPress={this.startStopTimer}>
            <Text style={{fontSize:20, marginTop:10}}>
              {!this.state.isTimerStart ? "START" : "STOP"}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.resetTimer}>
            <Text style={{fontSize:20, marginTop:10}}>RESET</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const handleTimerComplete = () => alert("Custom Completion Function")

const option = {
  container: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 200,
    alignItems:'center'
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  }
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
