import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'react-native-firebase';
import { observer, inject } from 'mobx-react';
import {
  Spinner,
  Button,
  Card,
  CardItem,
  Input,
  Item,
  Left,
  Right,
  Container,
  Content,
  Body,
  Title,
  Header,
} from 'native-base';

class LoginForm extends Component {
  renderSignIn() {
    if (this.props.store.userStore.loading1) {
      return <Spinner color="red" />;
    }

    return (
      <Button onPress={() => this.props.store.userStore.onLoginPress()} bordered>
        <Text>Log in</Text>
      </Button>
    );
  }
  renderSignUp() {
    if (this.props.store.userStore.loading2) {
      return <Spinner color="red" />;
    }

    return (
      <Button onPress={() => this.props.store.userStore.onSignUpPress()} bordered>
        <Text>Sign up</Text>
      </Button>
    );
  }

  render() {
    //console.log('user mobx ', this.props.store);
    const { userStore } = this.props.store;
    //console.log('user mobx ', userStore);
    return (
      <Container>
        <Content>
          <Header style={{ backgroundColor: '#e94153' }} androidStatusBarColor="#e11145">
            <Body>
              <Title>FasReco</Title>
            </Body>
          </Header>
          <Card>
            <CardItem>
              <Item>
                <Input
                  //label="Email"
                  value={userStore.email_text}
                  onChangeText={email => userStore.setEmail(email)}
                  placeholder="user@gmail.com"
                />
              </Item>
            </CardItem>

            <CardItem>
              <Item>
                <Input
                  secureTextEntry
                  placeholder="password"
                  //label="Password"
                  value={userStore.password}
                  onChangeText={password => userStore.setPassword(password)}
                />
              </Item>
            </CardItem>

            <Text style={styles.errorTextStyle}>{userStore.error}</Text>

            <CardItem style={{ paddingLeft: 20, paddingRight: 20 }}>
              <Left>{this.renderSignIn()}</Left>
              <Right>{this.renderSignUp()}</Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  },
  cardStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonStyle: {
    flex: 1,
  },
};
export default inject('store')(observer(LoginForm));
