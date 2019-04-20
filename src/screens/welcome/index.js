import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import {
  Button,
  Content,
  Container,
  Text,
  Card,
  CardItem,
  Left,
  Body,
  Right,
  Header,
  Icon,
  Title,
  List,
  Form,
  Input,
  Item,
} from 'native-base';
import { Overlay } from 'react-native-elements';

class Welcome extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    editName: '',
  };
  handleChange = name => {
    this.setState({ editName: name });
  };

  render() {
    const { memoStore } = this.props.store;
    {
      console.log('memo', memoStore.memoArray.slice());
    }
    return (
      <Container style={styles.container}>
        <Content>
          <Header style={{ backgroundColor: '#e94153' }} androidStatusBarColor="#e11145">
            <Body>
              <Title>FasReco</Title>
            </Body>
            <Left />
          </Header>
          <Text>Click the below button</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
            <Button style={{ backgroundColor: '#e94153' }} onPress={() => this.props.navigation.navigate('Camera')}>
              <Text>Snap</Text>
            </Button>
            <Button style={{ backgroundColor: '#e94153' }} onPress={() => memoStore.clear()}>
              <Text>Clear Whole List</Text>
            </Button>
          </View>
          <List dataArray={toJS(memoStore.memoArray)} renderRow={this.renderItem} />
          <Overlay
            isVisible={memoStore.overlayVisible}
            overlayBackgroundColor="white"
            width="80%"
            height="60%"
            onBackdropPress={() => memoStore.overlayFalse()}
          >
            <Form>
              <Item>
                <Input placeholder="Title" onChangeText={this.handleChange} />
              </Item>
              <Button style={{ backgroundColor: '#e94153' }} onPress={() => memoStore.editName(this.state.editName)}>
                <Text>Ok</Text>
              </Button>
            </Form>
          </Overlay>
        </Content>
      </Container>
    );
  }

  renderItem = (memo, x, index, z) => {
    const { memoStore } = this.props.store;
    return (
      <Card style={{ flex: 0, borderRadius: 3, marginLeft: 10, marginRight: 10 }}>
        <CardItem
          style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }}
          button
          onPress={() => {
            memoStore.setEditId(index);
            this.props.navigation.navigate('MemoView', {
              otherParam: index,
            });
          }}
        >
          <Left>
            <Button
              style={{ alignSelf: 'flex-start', backgroundColor: '#f57f17' }}
              full
              onPress={() => memoStore.overlayTrue(index)}
            >
              <Icon type="FontAwesome5" style={{ fontSize: 18 }} active name="user-edit" />
            </Button>
            <Text style={styles.text}>{memo.name}</Text>
          </Left>

          <Right>
            <Button style={{ alignSelf: 'flex-end' }} full danger onPress={() => memoStore.delete(index)}>
              <Icon style={{ fontSize: 24 }} active name="trash" />
            </Button>
          </Right>
        </CardItem>
      </Card>
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
