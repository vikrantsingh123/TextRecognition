import React, { Component } from 'react';
import { Container, Content, Spinner } from 'native-base';
import firebase from 'react-native-firebase';
class LoadingScreen extends Component {
  // check if user is already logged in
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.navigation.navigate(user ? 'MainStack' : 'LoginStack');
    });
  }

  render() {
    return (
      <Container>
        <Content>
          <Spinner color="red" />
        </Content>
      </Container>
    );
  }
}

export default LoadingScreen;
