import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Button, Content, Container, Text, List, Card, CardItem, Left, Body, Right } from 'native-base';

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
        <Card style={{ flex: 0, borderRadius: 3, marginLeft: 10, marginRight: 10 }}>
          <CardItem
            button
            style={{ margin: 4 }}
            onPress={() =>
              this.props.navigation.navigate('MemoView', {
                otherParam: memo.id,
              })
            }
          >
            <Left />
            <Body>
              <Text style={styles.text}>{memo.id}</Text>
            </Body>
            <Right />
          </CardItem>
        </Card>
      </Content>
    );
  };
}
export default inject('store')(observer(Welcome));

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
