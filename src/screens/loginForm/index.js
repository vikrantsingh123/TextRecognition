import React, { Component } from 'react';
import { Text } from 'react-native';
import colors from './../../assets/colors';
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
      return <Spinner color={colors.primaryColor} />;
    }

    return (
      <Button style={styles.buttonStyle} onPress={() => this.props.store.userStore.onLoginPress()}>
        <Text style={{ color: 'white' }}>Log in</Text>
      </Button>
    );
  }
  renderSignUp() {
    if (this.props.store.userStore.loading2) {
      return <Spinner color={colors.primaryColor} />;
    }

    return (
      <Button style={styles.buttonStyle} onPress={() => this.props.store.userStore.onSignUpPress()}>
        <Text style={{ color: 'white' }}>Sign up</Text>
      </Button>
    );
  }

  render() {
    const { userStore } = this.props.store;
    return (
      <Container>
        <Content style={{ backgroundColor: 'white' }}>
          <Header
            style={{ backgroundColor: colors.primaryColor, marginBottom: 10 }}
            androidStatusBarColor={colors.secondaryColor}
          >
            <Body>
              <Title>FasReco</Title>
            </Body>
          </Header>
          <Content style={{ padding: 10 }}>
            <Card style={{ borderColor: 'black', borderWidth: 100 }}>
              <CardItem>
                <Item>
                  <Input
                    value={userStore.email_text}
                    onChangeText={email => userStore.setEmail(email)}
                    placeholder="User@gmail.com"
                  />
                </Item>
              </CardItem>

              <CardItem>
                <Item>
                  <Input
                    secureTextEntry
                    placeholder="Password"
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
    padding: 30,
    backgroundColor: colors.primaryColor,
    borderRadius: 5,
  },
};
export default inject('store')(observer(LoginForm));
