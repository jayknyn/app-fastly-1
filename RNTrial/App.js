import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableHighlight, TextInput, Button, TouchableOpacity, Image} from 'react-native';
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
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
    const day = new Date().getDate()
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()
    const data = JSON.stringify({
      date: day + '/' + month + '/' + year,
      duration: this.state.fastedTime
    })
    console.log('data:', data)
    axios.post('https://phastly.firebaseio.com/fasts.json', data)
      .then(res => {
        console.log('axios post success, res.data:', res.data)
      })
      .catch(err => {
        console.log('axios get error, err:', err)
      })
  }

  render() {
    return (

      <View style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#fff'}}>
        <View style={{flex:1, marginTop:0, alignItems:'center', justifyContent:'center', backgroundColor: '#fff'}}>
          <Text style={{fontSize: 30, color: '#999'}}>PHAST.LY</Text>
          {/* <Text style={{fontSize: 20, color: '#ddd'}}>Intermittent Fasting Made Easy</Text> */}
        </View>
        <View style={{flex:1, marginTop:0, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize: 20}}>Enter your fasting target in hours</Text>
          <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
            <View style={{width: 50, height:60}}>
              <TextInput
                style={{fontSize: 30, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(e) => this.handleTargetInput(e)}
              />
            </View>
            <View style={{
                width:130, 
                height:60, 
                justifyContent: 'center', 
                marginLeft:20,
                backgroundColor: '#9a12b3',
                borderRadius: 5
              }}>
              <Button
                style={{fontSize:30, padding:5, borderRadius: 5}}
                onPress={this.startStopTimer}
                title={!this.state.isTimerStart ? "START FASTING" : "STOP"}
                color="#9a12b3"
              />
            </View>
          </View>
        </View>
        
        <View style={{flex:1, marginTop:0, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize: 20, marginBottom: 5}}>Fasting Time Left</Text>
          <Timer
            totalDuration={this.state.target} 
            start={this.state.isTimerStart}
            reset={this.state.resetTimer}
            options={options}
            handleFinish={handleTimerComplete}
          />
        </View>
        <View style={{flex:1, marginTop:0, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize: 20, marginBottom: 5}}>You've fasted for</Text>
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
            <View style={{
              width:130, 
              height:60, 
              justifyContent: 'center', 
              marginLeft:20,
              backgroundColor: '#9a12b3',
              borderRadius: 5
            }}>
              <Button
                onPress={() => this.handleSave()}
                title="Save Today's Fast"
                color="#9a12b3"
              />
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.buttonReset}
            onPress={this.resetTimer}
          >
            <Text>RESET</Text>
          </TouchableOpacity>

        </View>
      </View>

    );
  }
}

const handleTimerComplete = () => alert("Times Up!")

const options = {
  container: {
    backgroundColor: '#00b5cc',
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

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  buttonReset: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5
  },
  button: {
    width:130, 
    height:60, 
    justifyContent: 'center', 
    marginLeft:20,
    backgroundColor: '#9a12b3',
    borderRadius: 5
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
})
