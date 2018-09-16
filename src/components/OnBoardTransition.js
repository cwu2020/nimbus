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
    nodejs.start("main.js");
    nodejs.channel.addListener(
      "message",
      (msg) => {
        alert("From node: " + msg);
      },
      this
    );
  }
}
