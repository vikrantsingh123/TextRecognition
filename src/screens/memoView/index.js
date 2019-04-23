import React, { Component } from 'react';
import { StyleSheet, Clipboard } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Button, Content, Container, Text, List, Left, Body, Right, Header, Icon, Title } from 'native-base';
import Share from 'react-native-share';
import colors from '../../assets/colors';

class MemoView extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    visible: false,
  };

  onCancel() {
    console.log('CANCEL');
    this.setState({ visible: false });
  }
  onOpen() {
    console.log('OPEN');
    this.setState({ visible: true });
  }

  render() {
    const { memoStore } = this.props.store;
    const index = this.props.navigation.getParam('otherParam', 1);
    const header = memoStore.memoArray[index].name;
    let shareOptions = {
      title: 'React Native',
      message: memoStore.memoArray[index].content,
      social: Share.Social,
    };
    return (
      <Container style={styles.container}>
        <Content>
          <Header style={{ backgroundColor: colors.primaryColor }} androidStatusBarColor={colors.secondaryColor}>
            <Left>
              <Button transparent onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{header}</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={async () => {
                  await Clipboard.setString(memoStore.memoArray[index].content);
                  alert('Copied to Clipboard!');
                }}
              >
                <Icon type="AntDesign" name="copy1" />
              </Button>
              <Button
                transparent
                onPress={() => {
                  this.onCancel();
                  setTimeout(() => {
                    console.log('social', Share);
                    Share.shareSingle(
                      Object.assign(shareOptions, {
                        social: 'whatsapp',
                      })
                    );
                  }, 300);
                }}
              >
                <Icon type="AntDesign" name="sharealt" />
              </Button>
              <Button
                transparent
                onPress={() =>
                  this.props.navigation.navigate('EditView', {
                    otherParam: index,
                  })
                }
              >
                <Icon type="AntDesign" name="edit" />
              </Button>
            </Right>
          </Header>
          <Text>{memoStore.memoArray[index].content}</Text>
        </Content>
      </Container>
    );
  }
}
export default inject('store')(observer(MemoView));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
