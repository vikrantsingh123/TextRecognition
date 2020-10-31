import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import colors from './../../assets/colors';
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
  Form,
  Input,
  Item,
  Spinner,
} from 'native-base';
import { Overlay } from 'react-native-elements';

class Welcome extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    const { memoStore, userStore } = this.props.store;
    userStore.setUid();
    console.log('asdfasdf', memoStore);
    memoStore.fetchList();
  }
  state = {
    editName: '',
  };
  handleChange = name => {
    this.setState({ editName: name });
  };

  render() {
    const { memoStore } = this.props.store;
    if (memoStore.loader == true) {
      return (
        <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Spinner color={colors.primaryColor} />
        </Container>
      );
    }
    return (
      <Container style={styles.container}>
        <Content>
          <Header style={{ backgroundColor: colors.primaryColor }} androidStatusBarColor={colors.secondaryColor}>
            <Body>
              <Title>FasReco</Title>
            </Body>
            <Right>
              <Button
                transparent
                style={{ alignSelf: 'flex-start' }}
                full
                onPress={() => this.props.store.userStore.signoutUser()}
              >
                <Icon type="AntDesign" style={{ fontSize: 18 }} name="logout" />
              </Button>
            </Right>
          </Header>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
            <Button
              style={{ backgroundColor: colors.primaryColor }}
              onPress={() => this.props.navigation.navigate('Camera')}
            >
              <Text>Snap</Text>
            </Button>
            <Button style={{ backgroundColor: colors.primaryColor }} onPress={() => memoStore.clear()}>
              <Text>Clear Whole List</Text>
            </Button>
          </View>
          <FlatList
            inverted
            data={toJS(memoStore.memoArray)}
            keyExtractor={(memo, index) => index.toString()}
            renderItem={({ item, index }) => this.renderRow(item, index)}
          />
          <Overlay
            isVisible={memoStore.overlayVisible}
            overlayBackgroundColor="white"
            width="80%"
            height="35%"
            onBackdropPress={() => memoStore.overlayFalse()}
          >
            <Form>
              <Item>
                <Input placeholder="Title" onChangeText={this.handleChange} />
              </Item>
              <Button
                style={{ backgroundColor: colors.primaryColor, marginTop: 20, padding: 10, alignSelf: 'flex-end' }}
                onPress={() => memoStore.editName(this.state.editName)}
              >
                <Text>Ok</Text>
              </Button>
            </Form>
          </Overlay>
        </Content>
      </Container>
    );
  }

  renderRow = (memo, index) => {
    let id = parseInt(index);
    console.log('memo', memo);
    console.log('index', index);
    const { memoStore } = this.props.store;
    return (
      <Card style={{ flex: 0, borderRadius: 3, marginLeft: 10, marginRight: 10 }}>
        <CardItem
          style={{ paddingLeft: 0, paddingRight: 0, paddingTop: 0, paddingBottom: 0 }}
          button
          onPress={() => {
            memoStore.setEditId(parseInt(id));
            this.props.navigation.navigate('MemoView', {
              otherParam: id,
            });
          }}
        >
          <Left>
            <Button
              style={{ alignSelf: 'flex-start', backgroundColor: colors.editButtonColor }}
              full
              onPress={() => memoStore.overlayTrue(id)}
            >
              <Icon type="FontAwesome5" style={{ fontSize: 18 }} active name="user-edit" />
            </Button>
            <Text style={styles.text}>{memo.name}</Text>
          </Left>

          <Right>
            <Button
              style={{ alignSelf: 'flex-end', backgroundColor: colors.deleteButtonColor }}
              full
              onPress={() => memoStore.delete(id)}
            >
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
    backgroundColor: 'white',
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
