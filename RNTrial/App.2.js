import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight, TextInput, Button, Easing} from 'react-native';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import CountdownCircle from 'react-native-countdown-circle';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimerStart: false,
      isStopwatchStart: false,
      timerDuration: 90000,
      resetTimer: false,
      resetStopwatch: false,
      target: 90000
    };
    this.startStopTimer = this.startStopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.startStopStopWatch = this.startStopStopWatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
  }

  startStopTimer() {
    this.setState({
      isTimerStart: !this.state.isTimerStart,
      resetTimer: false,
      isStopwatchStart: !this.state.isStopwatchStart,
      resetStopwatch: false
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

  handleTargetInput(e) {
    console.log('target:', e)
    this.setState({
      target: Number(e)*3600*1000,
      sTimerStart: false,
      resetTimer: true

    },() => console.log('this.state.target:', this.state.target))
  }

  render() {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#eee'}}>
        <View style={{flex:1, marginTop:0, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize: 30}}>PHAST.LY</Text>
          <Text style={{fontSize: 20}}>Intermittent Fasting Made Easy</Text>

        </View>
        <View style={{flex:1, marginTop:0, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize: 20}}>Enter your fasting target in hours</Text>
            <TextInput
              style={{height:60, width:50, fontSize: 30, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(e) => this.handleTargetInput(e)}
            />
            <Button
              onPress={this.startStopTimer}
              title={!this.state.isTimerStart ? "START FASTING" : "STOP"}
              color="#ff0000"
            />
        </View>

        <View style={{flex:1, marginTop:0, alignItems:'center', justifyContent:'center'}}>
          <Stopwatch laps 
            start={this.state.isStopwatchStart}
            reset={this.state.resetStopwatch}
            options={options}
            getTime={this.getFormattedTime}
          />
          <TouchableHighlight onPress={this.startStopStopWatch}>
            <Text style={{fontSize: 20, marginTop: 10}}>
              {!this.state.isStopwatchStart ? "START FASTING" : "STOP"}
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.resetStopwatch}>
            <Text style={{fontSize: 20, marginTop: 10}}>RESET</Text>
          </TouchableHighlight>
        </View>
        <View style={{flex:1, marginTop:0, alignItems:'center', justifyContent:'center'}}>
          <Timer
            totalDuration={this.state.target} 
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

const options = {
  container: {
    backgroundColor: '#FF0000',
    padding: 5,
    borderRadius: 5,
    width: 250,
    alignItems:'center'
  },
  text: {
    fontSize: 25,
    color: '#FFF',
    marginLeft: 7,
  }
};
