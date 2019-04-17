import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Button, Content, Container, Text, List, Card, CardItem, Left, Body, Right } from 'native-base';

class MemoView extends Component {
  render() {
    const { memoStore } = this.props.store;
    const index = this.props.navigation.getParam('otherParam', 1);
    return (
      <Container style={styles.container}>
        <Content>
          <Text>{memoStore.memoArray.content}</Text>
          <List dataArray={memoStore.memoArray[index].content.slice()} renderRow={this.renderItem} />
        </Content>
      </Container>
    );
  }
  renderItem = memo => {
    console.log('In render', memo);
    return (
      <Content>
        <Text>{memo}</Text>
      </Content>
    );
  };
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
