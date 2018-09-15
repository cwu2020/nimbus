import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image } from 'react-native';
import Onboarding from 'react-native-simple-onboarding';
import OnBoardTransition from './OnBoardTransition';

export default class Onboard extends Component {
  constructor() {
    super();
    this.state = {
      completedOnboarding: false,
    };
  }
  
  render() {
    if (!this.state.completedOnboarding) {
      return (
        <Onboarding
          pages={[
            { backgroundColor: '#78c9f2', image: <Image source={require('../assets/animated_map.gif')} style={{width: 300, height: 300}}/>, title: 'Navigate', subtitle: 'Walking Directions Reinvented' },
            { backgroundColor: "#a6e0a7", image: <Image source={require('../assets/map.png')} style={{width: 250, height: 200}}/>, title: 'Direct', subtitle: 'Enter a location to walk to' },
            { backgroundColor: "#f6f6ee", image: <Image source={require('../assets/AR.png')} style={{width: 200, height: 200}}/>, title: 'View', subtitle: 'View directions in Augmented Reality' },
          ]}
          onEnd={() => this.setState({completedOnboarding: true})}
        />
      );
    }
    return (
      <OnBoardTransition/>
    );
  }
}
