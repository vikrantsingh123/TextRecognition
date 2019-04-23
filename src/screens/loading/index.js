import React, { Component } from 'react';
import { Container, Content, Spinner, Header } from 'native-base';
import firebase from 'react-native-firebase';
import colors from '../../assets/colors';

class LoadingScreen extends Component {
  // check if user is already logged in
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'MainStack' : 'LoginStack');
    });
  }

  render() {
    return (
      <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Spinner androidStatusBarColor={colors.secondaryColor} color={colors.primaryColor} />
      </Container>
    );
  }
}

export default LoadingScreen;
