import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Button, Content, Container, Text, List } from 'native-base';

class Welcome extends Component {
  render() {
    const { memoStore } = this.props.store;
    return (
      <Container style={styles.container}>
        <Content>
          <Text>Click the below button</Text>
          <Button onPress={() => this.props.navigation.navigate('Camera')}>
            <Text>Click</Text>
          </Button>
          <Button onPress={() => memoStore.clear()}>
            <Text>Clear Whole List</Text>
          </Button>

          <List dataArray={memoStore.memoArray.slice()} renderRow={this.renderItem} />
        </Content>
      </Container>
    );
  }
  renderItem = memo => {
    console.log('In render', memo.content);
    return (
      <Content>
        <Text>{memo.id}</Text>
        <Text />
      </Content>
    );
  };
}
export default inject('store')(observer(Welcome));

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
