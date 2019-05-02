import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight, TextInput, Button, Easing} from 'react-native';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import CountdownCircle from 'react-native-countdown-circle';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTimerStart: false,
      isStopwatchStart: false,
      timerDuration: 90000,
      resetTimer: false,
      resetStopwatch: false,
      target: 90000,
      fastedTime: null
    };
    this.startStopTimer = this.startStopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.startStopStopWatch = this.startStopStopWatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this.getFastedTime = this.getFastedTime.bind(this);
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
      resetTimer: true,
      isStopwatchStart: false,
      resetStopwatch: true
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

  getFastedTime(time) {
    console.log('time in getfastedtime', time)
    this.setState({
      fastedTime: time
    }, () => console.log('this.state.fastedTime', this.state.fastedTime))
  }

  handleTargetInput(e) {
    console.log('target:', e)
    this.setState({
      target: Number(e)*3600*1000,
      sTimerStart: false,
      resetTimer: true
    },() => {
      console.log('this.state.target:', this.state.target)
    })
  }

  handleSaveInput(input) {
    console.log('saved input:')
    this.setState({
      fastedTime: input
    }, () => console.log('this.state.fastedTime', this.state.fastedTime))
  }

  handleSave() {
    const data = JSON.stringify({
      date: '190610',
      duration: this.state.fastedTime
    })
    console.log('data:', data)
    axios.post('https://phastly.firebaseio.com/fasts.json', data)
      .then(res => {
        console.log('axios post success, res.data:', res.data)
      })
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
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: 50, height:60}}>
              <TextInput
                style={{fontSize: 30, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(e) => this.handleTargetInput(e)}
              />
            </View>
            <View style={{width:130, height:60, justifyContent: 'center', marginLeft:20}}>
              <Button
                style={{fontSize:30, padding:5}}
                onPress={this.startStopTimer}
                title={!this.state.isTimerStart ? "START FASTING" : "STOP"}
                color="#ff0000"
              />
            </View>
          </View>
        </View>
        
        <View style={{flex:1, marginTop:0, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize: 20}}>Fasting Time Left:</Text>
          <Timer
            totalDuration={this.state.target} 
            start={this.state.isTimerStart}
            reset={this.state.resetTimer}
            options={options}
            handleFinish={handleTimerComplete}
          />
        </View>
        <View style={{flex:1, marginTop:0, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize: 20}}>You've fasted for:</Text>
          <Stopwatch 
            start={this.state.isStopwatchStart}
            reset={this.state.resetStopwatch}
            options={options}
            getTime={this.getFormattedTime}
          />
        </View>
        <View style={{flex:1, marginTop:0, alignItems:'center', justifyContent:'center'}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{width: 80, height:60}}>
              <TextInput
                style={{fontSize: 30, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(input) => this.handleSaveInput(input)}
              />
            </View>
            <View style={{width:130, height:60, justifyContent: 'center', marginLeft:20}}>
              <Button
                onPress={() => this.handleSave()}
                title="Save Today's Fast"
                color="#ff0000"
              />
            </View>
          </View>
        </View>
        <View style={{flex:1, marginTop:0, alignItems:'center', justifyContent:'center'}}>
          <Button
            onPress={this.resetTimer}
            title="RESET"
            color="#ff0000"
          />
        </View>
      </View>
    );
  }
}

const handleTimerComplete = () => alert("Custom Completion Function")

const handleStopwatchFinish = () => alert("Stopwatch finish")

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
