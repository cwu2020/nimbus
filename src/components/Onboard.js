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
            { backgroundColor: '#EB5E65', image: <Image source={require('../assets/animated_nap.gif')} style={{width: 300, height: 300}}/>, title: 'Welcome!', subtitle: 'While you sleep, we lend your idle computing power to someone who needs it. Boom.' },
            { backgroundColor: '#D6DED1', image: <Image source={require('../assets/plug.jpg')} style={{width: 300, height: 300}}/>, title: 'Step 1:', subtitle: 'Plug in your phone.' },
            { backgroundColor: "#3260AE", image: <Image source={require('../assets/facebook.jpg')} style={{width: 301, height: 167}}/>, title: 'Step 2:', subtitle: 'Log into Facebook.' },
            { backgroundColor: "#F5F7FA", image: <Image source={require('../assets/animated_phone.gif')} style={{width: 300, height: 300}}/>, title: 'Step 4:', subtitle: 'Tell us about your phone.' },
            { backgroundColor: "#EB5240", image: <Image source={require('../assets/animated_lock.gif')} style={{width: 300, height: 300}}/>, title: 'Step 5:', subtitle: 'Thats it! Lock your phone and walk away.' },
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
