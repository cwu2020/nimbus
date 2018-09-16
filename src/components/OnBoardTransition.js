import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

import nodejs from 'nodejs-mobile-react-native';

let algo = "var rn_bridge = require('rn-bridge'); rn_bridge.channel.on('message', (msg) => { rn_bridge.channel.send(msg);});rn_bridge.channel.send('Node was initialized.');"

export default class OnBoardTransition extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
	    <Text style={{"paddingTop": "50%"}}></Text>
    )
  }

  componentWillMount() {
    nodejs.startWithScript(algo);
    nodejs.channel.addListener(
      "message",
      (msg) => {
        alert("From node: " + msg);
      },
      this
    );
  }
}
